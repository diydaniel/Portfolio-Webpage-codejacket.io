import React, { useState } from "react";
import { sendMagicLink } from "../utils/api";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setStatus("Sending magic link…");

    try {
      const result = await sendMagicLink(email);
      if (result.sent) {
        setStatus("Check your email for a login link!");
      } else {
        setStatus("Send failed — try again");
      }
    } catch (err) {
      console.error("sendMagicLink error:", err);
      setStatus("Send failed — please try again");
    }
  };

  return (
  <main style={styles.page}>
    <div style={styles.surface}>
      <h2 style={styles.formTitle}>Create Your Account</h2>
      <p style={styles.subtitle}>
        Enter your email to receive a secure login link.
      </p>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          placeholder="you@domain.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Send Login Link
        </button>
      </form>

      {status && <p style={styles.status}>{status}</p>}
    </div>
  </main>
);
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    fontFamily: "Menlo",
    backgroundColor: "#0B0B0B",
    color: "#EAEAEA",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "6rem",
    paddingBottom: "4rem",
  },

  surface: {
    backgroundColor: "#161616",
    border: "1px solid #2A2A2A",
    borderRadius: "12px",
    padding: "2.5rem 2rem",
    width: "100%",
    maxWidth: "420px",
    textAlign: "center",
  },

  formTitle: {
    fontSize: "1.75rem",
    marginBottom: "0.5rem",
    color: "#FFD700",
  },

  subtitle: {
    fontSize: "0.95rem",
    color: "#9CA3AF",
    marginBottom: "1.5rem",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },

  input: {
    backgroundColor: "#0B0B0B",
    color: "#EAEAEA",
    border: "1px solid #2A2A2A",
    borderRadius: "8px",
    padding: "0.75rem",
    fontSize: "0.95rem",
    outline: "none",
  },

  button: {
    marginTop: "0.5rem",
    backgroundColor: "#FFD700",
    color: "#111",
    border: "none",
    borderRadius: "8px",
    padding: "0.75rem",
    fontWeight: 600,
    fontSize: "0.95rem",
    cursor: "pointer",
  },

  status: {
    marginTop: "1rem",
    fontSize: "0.85rem",
    color: "#9CA3AF",
  },
};

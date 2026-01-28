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
    <div style={styles.container}>
      <h2 style={styles.header}>Create Your Account</h2>
      <p>Enter your email to receive a magic login link.</p>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          placeholder="Your email address"
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
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
    textAlign: "center",
  },
  header: {
    fontSize: "2rem",
    marginBottom: "0.5rem",
  },
  form: {
    marginTop: "1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    padding: "0.75rem",
    fontSize: "1rem",
    width: "300px",
    marginBottom: "1rem",
    borderRadius: "0.375rem",
    border: "1px solid #ccc",
  },
  button: {
    padding: "0.75rem 1.5rem",
    fontSize: "1rem",
    backgroundColor: "#0070f3",
    color: "#fff",
    border: "none",
    borderRadius: "0.375rem",
    cursor: "pointer",
  },
  status: {
    marginTop: "1rem",
    fontStyle: "italic",
  },
};

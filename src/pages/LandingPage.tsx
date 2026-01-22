import React, { useState } from "react";
import { sendMagicLink } from "../utils/api";

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await sendMagicLink(email);
    setStatus(result.sent ? "Check your email!" : "Send failed");
  };

  return (
    <form onSubmit={handleSubmit} style={{ textAlign: "center", marginTop: "2rem" }}>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{
          padding: "0.5rem",
          fontSize: "1rem",
          width: "300px",
          marginBottom: "1rem",
        }}
      />
      <br />
      <button type="submit" style={{ padding: "0.6rem 1.2rem", fontSize: "1rem" }}>
        Send Login Link
      </button>
      {status && <p style={{ marginTop: "1rem" }}>{status}</p>}
    </form>
  );
}

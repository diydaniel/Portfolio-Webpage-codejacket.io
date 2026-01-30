import React from "react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section style={styles.hero}>
      <h1 style={styles.title}>Failure is the pathway to success.</h1>
     
    </section>
  );
}

const styles: Record<string, React.CSSProperties> = {
  hero: {
  backgroundColor: "#1E1E1E", // ← lighter than page
  border: "1px solid #2F2F2F",
  borderRadius: "14px",
  padding: "2.75rem 2.5rem",
  maxWidth: "960px",
  width: "100%",
  textAlign: "center",
  boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
},


  title: {
    fontSize: "1.5rem",
    fontWeight: 500,
    color: "#EAEAEA",
    marginBottom: "0.75rem",
  },

  primaryButton: {
    backgroundColor: "#FFD700",
    color: "#0B0B0B",
    padding: "0.6rem 1.25rem",
    borderRadius: "8px",
    fontWeight: 600,
    textDecoration: "none",
  },
};

import React from "react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section style={styles.hero}>
      <h1 style={styles.title}>codejacket.io</h1>
      <Link to="/signup" style={styles.primaryButton}>
        Create Your Account
      </Link>
    </section>
  );
}

const styles: Record<string, React.CSSProperties> = {
  hero: {
    backgroundColor: "#161616",
    border: "1px solid #2A2A2A",
    borderRadius: "14px",
    padding: "2.25rem 2.5rem",
    maxWidth: "960px",
    width: "100%",
    textAlign: "center",
  },

  title: {
    fontSize: "2.3rem",
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

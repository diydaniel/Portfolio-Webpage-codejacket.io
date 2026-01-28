import React from "react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section style={styles.hero}>
      <h1 style={styles.title}>Welcome to <span style={styles.accent}>codejacket.io</span>!</h1>
      <p style={styles.subtitle}>
        Begin a new journey of code and production.
      </p>
      <Link to="/signup" style={styles.cta}>
        Create Your Account
      </Link>
    </section>
  );
}

const styles: Record<string, React.CSSProperties> = {
  hero: {
    textAlign: "center",
    padding: "3rem 1rem",
    backgroundColor: "#111",
    color: "#E0E0E0",
  },
  title: {
    fontSize: "3rem",
    marginBottom: "0.5rem",
  },
  accent: {
    color: "#FFD700",
  },
  subtitle: {
    fontSize: "1.25rem",
    marginBottom: "1.5rem",
    color: "#C0C0C0",
  },
  cta: {
    display: "inline-block",
    padding: "0.75rem 1.5rem",
    fontSize: "1.1rem",
    fontWeight: "bold",
    color: "#111",
    backgroundColor: "#FFD700",
    borderRadius: "0.375rem",
    textDecoration: "none",
  },
};

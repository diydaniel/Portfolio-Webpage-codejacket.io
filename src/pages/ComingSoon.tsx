// src/pages/ComingSoon.tsx
import React from "react";
import { Link } from "react-router-dom";

export default function ComingSoon() {
  return (
    <main style={styles.page}>
      <section style={styles.panel}>
        <h1 style={styles.title}>Private Beta</h1>
        <p style={styles.text}>
          Account creation is temporarily closed while we prepare the platform.
        </p>
        <p style={styles.text}>
          You’re welcome to explore our free Linux learning resources in the meantime.
        </p>

        <Link to="/resources" style={styles.link}>
          → Explore Linux Resources
        </Link>
      </section>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#0B0B0B",
    color: "#EAEAEA",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
    fontFamily: "Menlo",
  },
  panel: {
    backgroundColor: "#1E1E1E",
    border: "1px solid #2F2F2F",
    borderRadius: "14px",
    padding: "2.25rem",
    maxWidth: "520px",
    textAlign: "center",
  },
  title: {
    color: "#FFD700",
    marginBottom: "1rem",
  },
  text: {
    color: "#CFCFCF",
    lineHeight: 1.6,
    marginBottom: "1rem",
  },
  link: {
    display: "inline-block",
    marginTop: "0.75rem",
    color: "#FFD700",
    textDecoration: "none",
    fontWeight: 600,
  },
};

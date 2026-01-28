import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header style={styles.header}>
      <nav style={styles.nav}>
        <Link to="/" style={styles.logo}>
          codejacket.io
        </Link>

        <div style={styles.links}>
          <Link to="/signup" style={styles.link}>
            Sign Up
          </Link>
          <Link to="/signin" style={styles.link}>
            Sign In
          </Link>
        </div>
      </nav>
    </header>
  );
}

const styles: Record<string, React.CSSProperties> = {
  header: {
    width: "100%",
    padding: "1rem 2rem",
    backgroundColor: "#000",
    borderBottom: "1px solid #333",
  },
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    fontSize: "1.75rem",
    fontWeight: "bold",
    textDecoration: "none",
    color: "#FFD700",
  },
  links: {
    display: "flex",
    gap: "1rem",
  },
  link: {
    textDecoration: "none",
    fontSize: "1rem",
    color: "#E0E0E0",
  },
};

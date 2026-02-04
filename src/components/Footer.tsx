import React from "react";

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <p style={styles.text}>© {new Date().getFullYear()} codejacket.io -- All rights reserved.</p>
    </footer>
  );
}

const styles: Record<string, React.CSSProperties> = {
  footer: {
    marginTop: "3rem",
    padding: "1rem 0",
    background: "#161616",
    border: "1px solid #2A2A2A",
    textAlign: "center",
  },
  text: {
    fontFamily: "Menlo", 
    color: "#E0E0E0",
    fontSize: "0.9rem",
  },
};

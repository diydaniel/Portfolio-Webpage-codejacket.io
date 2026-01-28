import React from "react";

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <p style={styles.text}>© {new Date().getFullYear()} codejacket.io. All rights reserved.</p>
    </footer>
  );
}

const styles: Record<string, React.CSSProperties> = {
  footer: {
    marginTop: "3rem",
    padding: "1rem 0",
    backgroundColor: "#000",
    textAlign: "center",
  },
  text: {
    color: "#E0E0E0",
    fontSize: "0.9rem",
  },
};

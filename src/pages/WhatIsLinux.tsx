import React from "react";
import { Link } from "react-router-dom";

export default function WhatIsLinux() {
  
  return (

      // begin page content

    <main style={styles.page}>
      {/* Intro */}
      <section style={styles.hero}>
        <h1 style={styles.title}>
          
          What is Linux?
          
          </h1>
        <p style={styles.subtitle}>

          Linux is a free and open-source operating system kernel that powers
          servers, cloud platforms, embedded devices, and developer machines
          across the world.

        </p>
      </section>

      {/* Core explanation */}

      <section style={styles.panel}>
        <h2 style={styles.panelTitle}>
          
          Linux, Explained Simply
          
          </h2>
        <p style={styles.text}>
          
          Linux itself is <strong>not a full operating system</strong>.  
          It is the <strong>kernel</strong> — the core software that manages
          hardware, memory, processes, and security.

        </p>
        <p style={styles.text}>

          When people say “Linux,” they usually mean a <strong>Linux distribution</strong> —
          a complete operating system built around the Linux kernel and bundled
          with system tools, libraries, and applications.

        </p>
      </section>

      {/* Kernel vs Distro */}

      <section style={styles.panel}>
        <h2 style={styles.panelTitle}>
          
          Kernel vs Distribution
          
          </h2>

        <div style={styles.grid}>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>
              
              Linux Kernel
              
              </h3>

            <p style={styles.cardText}>

              The core engine. Handles:

            </p>
            <ul style={styles.list}>
              <li>CPU scheduling</li>
              <li>Memory management</li>
              <li>Hardware drivers</li>
              <li>Process isolation</li>
              <li>Security primitives</li>
            </ul>
          </div>

          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Linux Distribution</h3>
            <p style={styles.cardText}>
              A complete OS built around the kernel:
            </p>
            <ul style={styles.list}>
              <li>GNU tools & utilities</li>
              <li>Package manager</li>
              <li>Init system (systemd, etc.)</li>
              <li>Desktop or server environment</li>
            </ul>
          </div>
        </div>
      </section>

    <section style={styles.panel}>
  <p style={styles.linkCta}>
    Curious why Linux dominates servers, cloud platforms, and modern development?
  </p>

<Link
  to="/resources/why-linux"
  state={{ from: "what-linux" }}
  style={styles.linkButton}
  onMouseEnter={(e) =>
  (e.currentTarget.style.backgroundColor = "#222222")
}
onMouseLeave={(e) =>
  (e.currentTarget.style.backgroundColor = "#181818")
}
>
  → Why Linux?
</Link>

</section>

      {/* CTA */}
      <section style={styles.panel}>
        <p style={styles.cta}>
          Linux is not just a tool — it’s a foundation.
          <br />
          Learning it opens doors to systems engineering, cloud, security,
          and professional certifications.
        </p>
      </section>
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
    padding: "2.5rem 1.25rem",
    gap: "2rem",
  },

  hero: {
    maxWidth: "960px",
    width: "100%",
    backgroundColor: "#1E1E1E",
    border: "1px solid #2F2F2F",
    borderRadius: "14px",
    padding: "2rem",
  },

  title: {
    margin: 0,
    fontSize: "2rem",
    fontWeight: 600,
    color: "#FFD700",
  },

  subtitle: {
    marginTop: "0.75rem",
    color: "#9CA3AF",
    lineHeight: 1.6,
  },

  panel: {
    maxWidth: "960px",
    width: "100%",
    backgroundColor: "#1E1E1E",
    border: "1px solid #2F2F2F",
    borderRadius: "14px",
    padding: "1.75rem",
  },

  panelTitle: {
    marginBottom: "1rem",
    fontSize: "1.15rem",
    fontWeight: 600,
  },

  text: {
    lineHeight: 1.65,
    color: "#D1D5DB",
    marginBottom: "0.75rem",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "1rem",
  },

  card: {
    backgroundColor: "#222222",
    border: "1px solid #333333",
    borderRadius: "12px",
    padding: "1.25rem",
  },

  cardTitle: {
    marginBottom: "0.5rem",
    fontSize: "1rem",
    fontWeight: 600,
    color: "#FFD700",
  },

  cardText: {
    color: "#9CA3AF",
    marginBottom: "0.5rem",
  },

  list: {
    paddingLeft: "1.2rem",
    lineHeight: 1.6,
  },

  bullets: {
    paddingLeft: "1.25rem",
    lineHeight: 1.7,
    color: "#D1D5DB",
  },

  tags: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
  },

  tag: {
    fontSize: "0.8rem",
    padding: "0.25rem 0.6rem",
    backgroundColor: "#181818",
    border: "1px solid #2F2F2F",
    borderRadius: "999px",
  },

  cta: {
    textAlign: "center",
    color: "#CFCFCF",
    lineHeight: 1.6,
  },

  linkCta: {
  textAlign: "center",
  color: "#CFCFCF",
  marginBottom: "0.75rem",
  lineHeight: 1.6,
},

linkButton: {
  display: "inline-block",
  margin: "0 auto",
  padding: "0.6rem 1.4rem",
  borderRadius: "8px",
  border: "1px solid #2F2F2F",
  backgroundColor: "#181818",
  color: "#FFD700",
  textDecoration: "none",
  fontWeight: 600,
  transition: "background-color 160ms ease, transform 160ms ease",
},

};


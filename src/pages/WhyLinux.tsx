import React from "react";
import { useLocation, Navigate } from "react-router-dom";

export default function WhyLinux() {
  const location = useLocation();

  // 🚫 Block direct access
  if (location.state?.from !== "what-linux") {
    return <Navigate to="/resources" replace />;
  }

  return (
    <main style={styles.page}>
      <section style={styles.panel}>
        <h1 style={styles.title}>Why Linux?</h1>

        <p style={styles.text}>
          Linux didn’t win because of marketing.
          It won because it gave engineers control.
        </p>

        <p style={styles.text}>
          From servers to cloud platforms, Linux became the default
          because it scales, adapts, and exposes its internals instead
          of hiding them.
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
    justifyContent: "center",
    padding: "2.5rem 1.25rem",
  },
  panel: {
    maxWidth: "960px",
    width: "100%",
    backgroundColor: "#1E1E1E",
    border: "1px solid #2F2F2F",
    borderRadius: "14px",
    padding: "2rem",
  },
  title: {
    color: "#FFD700",
    marginBottom: "1rem",
  },
  text: {
    lineHeight: 1.65,
    color: "#D1D5DB",
  },
};

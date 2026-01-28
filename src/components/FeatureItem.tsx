import React from "react";

interface Props {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function FeatureItem({ icon, title, description }: Props) {
  return (
    <div style={styles.card}>
      <div style={styles.icon}>{icon}</div>
      <h3 style={styles.title}>{title}</h3>
      <p style={styles.desc}>{description}</p>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    textAlign: "center",
    padding: "1.25rem",
    border: "1px solid #333",
    borderRadius: "0.375rem",
    backgroundColor: "#1a1a1a",
    color: "#E0E0E0",
    maxWidth: "240px",
    margin: "0.5rem",
  },
  icon: {
    fontSize: "2.25rem",
    color: "#FFD700",
    marginBottom: "0.5rem",
  },
  title: {
    fontSize: "1.3rem",
    fontWeight: "600",
    margin: "0.5rem 0",
  },
  desc: {
    fontSize: "0.95rem",
    color: "#ccc",
  },
};

import React from "react";
import FeatureItem from "./FeatureItem";

const features = [
  {
    icon: "⚡️",
    title: "Guide to the Information Technology Profession",
    description: "The Many Paths professionals take to enter IT.",
  },
  {
    icon: "🔒",
    title: "Our best Starting point: Linux Fundamentals",
    description: "Starting is easier than you think.",
  },
];

export default function FeatureList() {
  return (
    <section style={styles.section}>
      {features.map((feature, index) => (
        <div
          key={feature.title}
          style={{
            animationDelay: `${index * 90}ms`, // 👈 STAGGER HERE
          }}
        >
          <FeatureItem {...feature} />
        </div>
      ))}
    </section>
  );
}

const styles: Record<string, React.CSSProperties> = {
  section: {
  backgroundColor: "#1E1E1E",
  border: "1px solid #2F2F2F",
  borderRadius: "14px",
  padding: "2rem",
  maxWidth: "960px",
  width: "100%",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "1.75rem",
},
};

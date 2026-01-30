import React from "react";
import FeatureItem from "./FeatureItem";

const features = [
  {
    icon: "⚡️",
    title: "Learn Linux and Earn Top Rated Certifications",
    description: "Linux Professional Institute - LPIC",
  },
  {
    icon: "🔒",
    title: "LPIC - Essentials",
    description: "Build a solid foundation for a Career in Information Technology.",
  },
  {
    icon: "⚙️",
    title: "LPIC - 1",
    description: "This is sound System Administration skills for Linux Professionals.",
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
    backgroundColor: "#161616",
    border: "1px solid #2A2A2A",
    borderRadius: "12px",
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    gap: "1.75rem",
  },
};

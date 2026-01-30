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
    description: "Recommend to start here for a solid foundation in Linux.",
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

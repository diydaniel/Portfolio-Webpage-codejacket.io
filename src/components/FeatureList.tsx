import React from "react";
import { Link } from "react-router-dom";
import FeatureItem from "./FeatureItem";

interface FeatureListProps {
  isLoggedIn?: boolean;
}

export default function FeatureList({ isLoggedIn = false }: FeatureListProps) {
  const features = [
    {
      icon: "🐧",
      title: "What is Linux?",
      description:
        "Understand the foundation powering servers, cloud platforms, and modern development.",
      to: "/resources", // What is Linux page
    },
    {
      icon: "🚀",
      title: isLoggedIn ? "Go to Dashboard" : "Create Your Account",
      description: isLoggedIn
        ? "Access your learning tools and progress."
        : "Start your journey into Linux and IT fundamentals.",
      to: isLoggedIn ? "/dashboard" : "/signup",
    },
  ];

  return (
    <section style={styles.section}>
      {features.map((feature, index) => (
        <Link
          key={feature.title}
          to={feature.to}
          style={styles.link}
        >
          <div
            style={{
              animationDelay: `${index * 90}ms`, // stagger preserved
            }}
          >
            <FeatureItem
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          </div>
        </Link>
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

  link: {
    textDecoration: "none",
    color: "inherit",
  },
};

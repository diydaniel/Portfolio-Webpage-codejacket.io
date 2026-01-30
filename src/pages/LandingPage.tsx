import React from "react";
import HeroSection from "../components/HeroSection";
import FeatureList from "../components/FeatureList";

export default function LandingPage() {
  return (
    <main style={styles.page}>
      <HeroSection />
      <FeatureList />
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

    paddingTop: "2rem",
    paddingBottom: "2rem",

    gap: "2.5rem", // ⬅ was 4rem
  },
};

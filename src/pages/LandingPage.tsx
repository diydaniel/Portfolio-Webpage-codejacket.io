import React from "react";
import HeroSection from "../components/HeroSection";
import FeatureList from "../components/FeatureList";
import { useLocation } from "react-router-dom";

export default function LandingPage() {
  const location = useLocation();
  const loggedOut = location.state?.loggedOut;

  return (
    <main style={styles.page}>
      {loggedOut && (
        <div style={styles.notice}>
          You’ve been logged out successfully.
        </div>
      )}

      <HeroSection />
      <FeatureList isLoggedIn={false} />
     { /* <FeatureList isLoggedIn={!!user} /> */}
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
  notice: {
  backgroundColor: "#1C1C1C",
  border: "1px solid #2A2A2A",
  borderRadius: "10px",
  padding: "0.75rem 1.25rem",
  color: "#9CA3AF",
  fontSize: "0.9rem",
}
};

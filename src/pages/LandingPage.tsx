import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FeatureList from "../components/FeatureList";
import HeroSection from "../components/HeroSection";

export default function LandingPage() {
  return (
    <>


      <div style={styles.container}>
      
        
        <HeroSection />
        <FeatureList />

      </div>

    
    </>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "80vh",
    textAlign: "center",
    padding: "1rem",
  },
  header: {
    fontSize: "3rem",
    marginBottom: "0.5rem",
  },
  subheader: {
    fontSize: "1.25rem",
    marginBottom: "1.5rem",
    color: "#555",
  },
  button: {
    padding: "0.75rem 1.5rem",
    fontSize: "1.1rem",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#0070f3",
    borderRadius: "0.375rem",
    textDecoration: "none",
  },
};

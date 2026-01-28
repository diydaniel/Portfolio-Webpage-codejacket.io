import React from "react";
import FeatureItem from "./FeatureItem";

export default function FeatureList() {
  return (
    <section style={styles.section}>
      <FeatureItem
        icon={"⚡️"}
        title="Fast Authentication"
        description="Instant magic link login — no password required."
      />
      <FeatureItem
        icon={"🔒"}
        title="Secure Sessions"
        description="Encrypted and secure session cookies."
      />
      <FeatureItem
        icon={"⚙️"}
        title="API Powered"
        description="Built on Cloudflare Workers & Resend."
      />
    </section>
  );
}

const styles: Record<string, React.CSSProperties> = {
  section: {
    display: "flex",
    gap: "2rem",
    justifyContent: "center",
    flexWrap: "wrap",
    margin: "2rem 1rem",
    backgroundColor: "#111",
  },
};

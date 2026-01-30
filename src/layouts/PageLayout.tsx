import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

type PageLayoutProps = {
  children: React.ReactNode;
  center?: boolean;
};

export default function PageLayout({ children, center = false }: PageLayoutProps) {
  return (
    <>
      <Header />

      <main
        style={{
          flex: 1,
          width: "100%",
          backgroundColor: "#0B0B0B",
          color: "#EAEAEA",
          display: "flex",
          flexDirection: "column",
          alignItems: center ? "center" : "stretch",
          padding: "2.5rem 1.5rem"
        }}
      >
        {children}
      </main>

      <Footer />
    </>
  );
}

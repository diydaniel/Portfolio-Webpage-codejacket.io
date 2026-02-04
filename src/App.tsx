import { BrowserRouter, Routes, Route } from "react-router-dom";
import { API_BASE } from "./config";
import PageLayout from "./layouts/PageLayout";

console.log("API_BASE in App:", API_BASE);
 
import LandingPage from "./pages/LandingPage";
import SignUp from "./pages/SignUp";
import Verify from "./pages/Verify";
import Dashboard from "./pages/Dashboard";
import WhyLinux from "./pages/WhyLinux";
import WhatIsLinux from "./pages/WhatIsLinux";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PageLayout>
              <LandingPage />
            </PageLayout>
          }
        />

        <Route
          path="/signup"
          element={
            <PageLayout center>
              <SignUp />
            </PageLayout>
          }
        />

        <Route
          path="/verify"
          element={
            <PageLayout center>
              <Verify />
            </PageLayout>
          }
        />

        <Route
          path="/dashboard"
          element={
            <PageLayout>
              <Dashboard />
            </PageLayout>
          }
        />
       
          <Route 
            path="/resources"
            element={
              <PageLayout>
                <WhatIsLinux />
              </PageLayout>
         } />

          <Route 
            path="/resources/why-linux"
            element={
              <PageLayout>
                <WhyLinux />
              </PageLayout>
         } />
  
      </Routes>
    </BrowserRouter>
  );
}

const styles = {
  app: {
    minHeight: "auto",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#0B0B0B",
  },
  content: {
    flex: 1, // 🔑 THIS keeps footer visible
    display: "flex",
    justifyContent: "center",
  },
};
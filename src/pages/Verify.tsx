// src/pages/Verify.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../config";

export default function Verify() {
  const [status, setStatus] =
    useState<"loading" | "success" | "error">("loading");
  const [debug, setDebug] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const url = new URL(window.location.href);
        const token = url.searchParams.get("token");

        if (!token) {
          setStatus("error");
          setDebug("No token found in URL");
          return;
        }

        const verifyUrl = `${API_BASE}/auth/verify?token=${encodeURIComponent(
          token
        )}`;

        console.log("Calling verify endpoint:", verifyUrl);

        const res = await fetch(verifyUrl, {
          method: "GET",
          credentials: "include",
        });

        const bodyText = await res.text();
        console.log("verify response:", res.status, bodyText);

        if (!res.ok) {
          setStatus("error");
          setDebug(`status ${res.status}, body: ${bodyText}`);
          return;
        }

        // If success, optionally parse JSON, then go to dashboard
        setStatus("success");
        // small delay to let user see it
        setTimeout(() => {
          navigate("/dashboard", { replace: true });
        }, 800);
      } catch (err: unknown) {
        console.error("verify error:", err);
        setStatus("error");
        setDebug(String(err));
      }
    })();
  }, [navigate]);

  if (status === "loading") {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        Verifying your link…
      </div>
    );
  }

  if (status === "success") {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        Verified! Redirecting to your dashboard…
      </div>
    );
  }

  // error
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <p>Verification failed. Request a new link.</p>
      {debug && (
        <pre
          style={{
            marginTop: "1rem",
            fontSize: "0.8rem",
            color: "#888",
            whiteSpace: "pre-wrap",
            textAlign: "left",
          }}
        >
          {debug}
        </pre>
      )}
    </div>
  );
}

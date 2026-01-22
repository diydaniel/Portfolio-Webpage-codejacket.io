import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { API_BASE } from "../utils/api";

export default function Verify() {
  const [status, setStatus] = useState("Verifying...");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
  const token = searchParams.get("token");
  if (!token) {
    setStatus("Missing token.");
    return;
  }

  (async () => {
    try {
      const res = await fetch(`${API_BASE}/auth/verify?token=${token}`, {
        method: "GET",
        credentials: "include",
      });

      if (res.ok) {
        setStatus("Verified! Redirecting...");
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        const data = await res.json();
        setStatus(`Verification failed: ${data.error}`);
      }
    } catch (err) {
      if (err instanceof Error) {
        setStatus("Verification error: " + err.message);
      } else {
        setStatus("Verification error");
      }
    }
  })();
}, [searchParams, navigate]);


  return <p>{status}</p>;
}

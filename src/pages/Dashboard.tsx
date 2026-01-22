import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, logoutUser } from "../utils/api";

export default function Dashboard() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const user = await getCurrentUser();
        if (!user) {
          // No user logged in → redirect to login
          navigate("/");
        } else {
          setUserEmail(user.email);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        navigate("/");
      } finally {
        setLoading(false);
      }
    })();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.error("Logout failed:", err);
    }
    navigate("/");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h1>Dashboard</h1>
      {userEmail ? (
        <>
          <p>Welcome, {userEmail}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <p>No active session.</p>
      )}
    </div>
  );
}

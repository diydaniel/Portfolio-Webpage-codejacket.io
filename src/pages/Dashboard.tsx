import { useEffect, useState } from "react";
import { getCurrentUser } from "../utils/api";

export default function Dashboard() {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await getCurrentUser();
        if (res?.user) {
          setUser(res.user);
        }
      } catch (err) {
        console.error("Dashboard auth error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  if (loading) {
    return <p>Loading session…</p>;
  }

  if (!user) {
    return <p>No active session.</p>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user.email}</p>
    </div>
  );
}

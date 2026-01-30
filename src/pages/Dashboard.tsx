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
    return <p style={styles.loading}>Loading session…</p>;
  }

  if (!user) {
    return <p style={styles.loading}>No active session.</p>;
  }

  return (
    <main style={styles.page}>
      <section style={styles.panel}>
        <h1 style={styles.title}>Dashboard</h1>
        <p style={styles.subtitle}>
          Logged in as <span style={styles.email}>{user.email}</span>
        </p>
      </section>

      <section style={styles.panel}>
        <h2 style={styles.sectionTitle}>Getting Started</h2>
        <ul style={styles.list}>
          <li>• Create your first project</li>
          <li>• Explore open-source tools</li>
          <li>• Connect your workflow</li>
        </ul>
      </section>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    fontFamily: "Menlo",
    backgroundColor: "#0B0B0B",
    color: "#EAEAEA",
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "4rem",
    paddingBottom: "4rem",
    gap: "2.5rem",
  },

  panel: {
    width: "100%",
    maxWidth: "900px",
    backgroundColor: "#141414",
    border: "1px solid #2A2A2A",
    borderRadius: "12px",
    padding: "2rem",
  },

  title: {
    fontSize: "2.5rem",
    marginBottom: "0.25rem",
  },

  subtitle: {
    fontSize: "1rem",
    color: "#B5B5B5",
  },

  email: {
    color: "#FFD700",
  },

  sectionTitle: {
    fontSize: "1.25rem",
    marginBottom: "1rem",
    color: "#EAEAEA",
  },

  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    lineHeight: "1.8",
    color: "#CFCFCF",
  },

  loading: {
    fontFamily: "Menlo",
    padding: "4rem",
    textAlign: "center",
    color: "#B5B5B5",
  },
};

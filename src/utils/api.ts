// src/utils/api.ts

export const API_BASE = import.meta.env.VITE_API_BASE as string; 

export async function sendMagicLink(email: string) {
  try {
    const response = await fetch(
      "https://codejacket-api.codejacket.workers.dev/auth/start",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }), // use the argument!
      }
    );

    const data = await response.json();
    console.log("sendMagicLink response:", data);

    return data;
  } catch (err) {
    console.error("sendMagicLink error:", err);
    throw err; // propagate error for UI to handle
  }
}


export async function verifyToken(token: string): Promise<Response> {
  return fetch(`${API_BASE}/auth/verify?token=${encodeURIComponent(token)}`, {
    credentials: "include", // needed for cookies
  });
}

export async function getCurrentUser(): Promise<{ email: string } | null> {
  const res = await fetch(`${API_BASE}/me`, { credentials: "include" });
  if (!res.ok) return null;
  const json = await res.json();
  return json.user ?? null;
}

export async function logoutUser(): Promise<void> {
  await fetch(`${API_BASE}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
}

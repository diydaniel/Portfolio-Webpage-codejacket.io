// src/utils/api.ts
import { API_BASE } from "../config";

type ApiResult<T = unknown> = {
  ok: boolean;
  data?: T;
  error?: string;
};

// --- Magic link / signup ---
export async function sendMagicLink(
  email: string
): Promise<{ sent: boolean; error?: string }> {
  const res = await fetch(`${API_BASE}/auth/start`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const data = await res.json().catch(() => ({} as any));
  console.log("sendMagicLink response:", data);

  if (!res.ok) {
    return { sent: false, error: data?.error || "Request failed" };
  }

  return { sent: true };
}

// --- /me: get current user (what your components expect) ---
export async function getCurrentUser(): Promise<{
  user: { email: string } | null;
}> {
  const res = await fetch(`${API_BASE}/me`, {
    method: "GET",
    credentials: "include",
  });

  const data = await res.json().catch(() => ({} as any));
  console.log("getCurrentUser response:", data);

  // Your Worker returns { user: null } or { user: { email } }
  return { user: data.user ?? null };
}

// Optional: more detailed version if you need it anywhere else
export async function fetchCurrentUser(): Promise<
  ApiResult<{ email: string } | null>
> {
  const { user } = await getCurrentUser();
  return { ok: true, data: user };
}

// --- Protected data example ---
export async function fetchProtected(): Promise<ApiResult> {
  const res = await fetch(`${API_BASE}/api/protected`, {
    method: "GET",
    credentials: "include",
  });

  const data = await res.json().catch(() => ({} as any));

  if (!res.ok) {
    return { ok: false, error: data?.error || "Failed to load protected data" };
  }

  return { ok: true, data };
}

// --- Logout ---
export async function logoutUser(): Promise<ApiResult> {
  const res = await fetch(`${API_BASE}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  const data = await res.json().catch(() => ({} as any));

  if (!res.ok) {
    return { ok: false, error: data?.error || "Logout failed" };
  }

  return { ok: true, data };
}

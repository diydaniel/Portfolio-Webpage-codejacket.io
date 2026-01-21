// cloudflare/utils/auth.js

import { verifyJWT } from "./jwt.js";

export async function requireAuth(request, env) {
  const cookieHeader = request.headers.get("Cookie") || "";
  const cookies = Object.fromEntries(
    cookieHeader
      .split(";")
      .map((c) => c.trim().split("="))
      .filter(([key, val]) => key && val)
  );

  const token = cookies["cj_session"];
  if (!token) {
    return { ok: false, status: 401, body: { error: "Not authenticated" } };
  }

  try {
    const payload = await verifyJWT(token, env.SESSION_JWT_SECRET);
    return { ok: true, user: payload };
  } catch (err) {
    return { ok: false, status: 401, body: { error: "Invalid session" } };
  }
}

// This helper:

// ✔ Reads the cj_session cookie
// ✔ Verifies the JWT
// ✔ Returns { ok: false } if no session or invalid
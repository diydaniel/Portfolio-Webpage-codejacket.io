import { hashToken } from "../utils/token.js";
import { signJWT } from "../utils/jwt.js";

export async function authVerify(request, env) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");

  if (!token) {
    return new Response("Missing token", { status: 400 });
  }

  const hashed = await hashToken(token);
  const email = await env.LOGIN_TOKENS.get(`login:${hashed}`);

  if (!email) {
    return new Response("Invalid or expired token", { status: 401 });
  }

  // Remove the token so it can't be reused
  await env.LOGIN_TOKENS.delete(`login:${hashed}`);

  // Create JWT session
  const jwt = await signJWT(
    { email },
    env.SESSION_JWT_SECRET,
    60 * 60 * 24 * 7 // 7 days
  );

  const headers = new Headers();
  headers.set(
    "Set-Cookie",
    `cj_session=${jwt}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${60 * 60 * 24 * 7}`
  );

  // Optionally redirect (302) or return JSON
  return new Response(null, {
    status: 302,
    headers: {
      ...Object.fromEntries(headers),
      "Location": `${env.APP_ORIGIN}/dashboard.html`, // or wherever
    },
  });
}


// 🔑 1. Token lookup and validation

// 🛡 2. JWT creation

// 🍪 3. Cookie set

// 🔁 4. Redirect after login
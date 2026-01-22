import { hashToken } from "../utils/token.js";
import { signJWT } from "../utils/jwt.js";

export async function authVerify(request, env) {
  try {
    const url = new URL(request.url);
    const token = url.searchParams.get("token");

    if (!token) {
      return new Response(JSON.stringify({ error: "Missing token" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const hashed = await hashToken(token);
    const email = await env.LOGIN_TOKENS.get(`login:${hashed}`);

    if (!email) {
      return new Response(JSON.stringify({ error: "Invalid or expired token" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Remove the one‑time login token
    await env.LOGIN_TOKENS.delete(`login:${hashed}`);

    // Create session JWT
    const jwt = await signJWT(
      { email },
      env.SESSION_JWT_SECRET,
      60 * 60 * 24 * 7 // 7 days
    );

    // Build the cookie header string
    const cookieValue = [
      `cj_session=${jwt}`,
      "Path=/",
      "HttpOnly",
      "Secure",
      "SameSite=Lax",
      `Max-Age=${60 * 60 * 24 * 7}`
    ].join("; ");

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": cookieValue
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

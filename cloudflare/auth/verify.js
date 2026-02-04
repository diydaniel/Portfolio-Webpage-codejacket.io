// cloudflare/auth/verify.js
import { hashToken } from "../utils/token.js";
import { signJWT } from "../utils/jwt.js";

export async function authVerify(request, env) {
  try {
    const url = new URL(request.url);
    const token = url.searchParams.get("token");

    console.log("JWT secret length:", env.SESSION_JWT_SECRET?.length);


    if (!token) {
      return new Response(JSON.stringify({ error: "Missing token" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 1) Look up token in KV
    const hashed = await hashToken(token);
    const email = await env.LOGIN_TOKENS.get(`login:${hashed}`);

    if (!email) {
      return new Response(
        JSON.stringify({ error: "Invalid or expired token" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // 2) One-time use: delete it
    await env.LOGIN_TOKENS.delete(`login:${hashed}`);

    // 3) Create session JWT
    const jwt = await signJWT(
      { email },
      env.SESSION_JWT_SECRET,
      60 * 60 * 24 * 7 // 7 days
    );

    const cookieValue = [
      `cj_session=${jwt}`,
      "Path=/",
      "HttpOnly",
      "Secure",
      "SameSite=Lax",
      `Max-Age=${60 * 60 * 24 * 7}`,
    ].join("; ");

    // 4) Return JSON + cookie (no redirect yet)
    return new Response(JSON.stringify({ status: "ok", email }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": cookieValue,
      },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err && err.message ? err.message : String(err) }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

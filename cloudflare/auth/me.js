// cloudflare/auth/me.js

import { verifyJWT } from "../utils/jwt.js";

export async function getCurrentUser(request, env) {
  try {
    const cookieHeader = request.headers.get("Cookie") || "";
    const cookies = Object.fromEntries(
      cookieHeader.split(";").map((c) => {
        const [key, ...v] = c.trim().split("=");
        return [key, v.join("=")];
      })
    );

    const token = cookies["cj_session"];
    if (!token) {
      return new Response(JSON.stringify({ user: null }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const payload = await verifyJWT(token, env.SESSION_JWT_SECRET);
    // You may include more user fields here in the future
    return new Response(JSON.stringify({ user: { email: payload.email } }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    // Token is missing/invalid/expired
    return new Response(JSON.stringify({ user: null }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// What this does:

// - Parses cookies

// - Looks for cj_session

// - Verifies it using your JWT secret

// - Returns user info
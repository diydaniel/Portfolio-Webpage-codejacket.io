import { generateToken, hashToken } from "../utils/token.js";
import { sendMagicLinkEmail } from "../utils/email.js";

export async function authStart(request, env) {
  const { email } = await request.json();
  if (!email || !email.includes("@")) {
    return new Response(JSON.stringify({ error: "Invalid email" }), {
      status: 400,
    });
  }

  // Generate token and hashed version
  const token = generateToken();
  const hashed = await hashToken(token);

  // Store hashed token -> email in KV with TTL (e.g., 15m)
  await env.LOGIN_TOKENS.put(`login:${hashed}`, email, {
    expirationTtl: 15 * 60,
  });

  // Magic link
  const magicLink = `${env.API_ORIGIN}/auth/verify?token=${encodeURIComponent(
    token
  )}`;

  const sent = await sendMagicLinkEmail(env, email, magicLink);

return new Response(JSON.stringify({ sent }), {
  // return new Response(JSON.stringify({ sent, magicLink }), { // For testing purposes

    headers: { "Content-Type": "application/json" },
    status: sent ? 200 : 500,
  });
  console.log("authStart running for email:", email);
}

// What this does:

// Validates the email

// Generates a one-time token

// Stores its hash in KV (LOGIN_TOKENS) with a short TTL

// Sends a magic link via Resend
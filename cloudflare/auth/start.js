import { generateToken, hashToken } from "../utils/token.js";

export async function authStart(request, env) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return new Response(JSON.stringify({ error: "Invalid email" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const token = generateToken();
    const hashed = await hashToken(token);

    await env.LOGIN_TOKENS.put(`login:${hashed}`, email, {
      expirationTtl: 15 * 60,
    });

    // 👇 FORCE a safe default + LOG IT
    const appOrigin = env.APP_ORIGIN || "http://localhost:5173";
    const verifyUrl = `${appOrigin}/verify?token=${token}`;

    console.log("authStart APP_ORIGIN:", env.APP_ORIGIN);
    console.log("authStart appOrigin used:", appOrigin);
    console.log("authStart verifyUrl:", verifyUrl);

    const emailBody = {
      from: env.EMAIL_FROM,
      to: email,
      subject: "Your CodeJacket Login Link",
      html: `...${verifyUrl}...`, // your existing HTML
    };

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
      },
      body: JSON.stringify(emailBody),
    });

    const resendResult = await resendResponse.json();
    console.log("Resend response status:", resendResponse.status);
    console.log("Resend result:", JSON.stringify(resendResult, null, 2));

    if (!resendResponse.ok) {
      return new Response(
        JSON.stringify({ error: "Failed to send email", resendError: resendResult }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify({ sent: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("authStart error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

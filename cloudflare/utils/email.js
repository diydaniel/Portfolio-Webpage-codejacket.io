export async function sendMagicLinkEmail(env, to, magicLink) {
  // Build HTML or text content
  const html = `
    <p>Click the link below to sign in:</p>
    <p><a href="${magicLink}">${magicLink}</a></p>
    <p>If you didn’t request this, ignore it.</p>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.EMAIL_FROM,
      to: [to],
      subject: "Your CodeJacket Login Link",
      html,
    }),
  });

  if (!res.ok) {
    console.error("Resend error:", await res.text());
  }

  return res.ok;
}

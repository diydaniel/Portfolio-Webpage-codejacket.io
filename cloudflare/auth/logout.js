export async function logout(request, env) {
  const headers = new Headers();

  // Clear the session cookie
  headers.append(
    "Set-Cookie",
    `cj_session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`
  );

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      ...Object.fromEntries(headers),
      "Content-Type": "application/json",
    },
  });
}

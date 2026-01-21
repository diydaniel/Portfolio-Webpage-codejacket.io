// cloudflare/auth/me.js

export async function getCurrentUser(request, env) {
  // Placeholder
  return new Response(JSON.stringify({ user: null }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

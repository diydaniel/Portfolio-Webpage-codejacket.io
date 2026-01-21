// cloudflare/api/protected.js

import { requireAuth } from "../utils/auth.js";

export async function protectedHandler(request, env) {
  const auth = await requireAuth(request, env);

  if (!auth.ok) {
    return new Response(JSON.stringify(auth.body), {
      status: auth.status,
      headers: { "content-type": "application/json" },
    });
  }

  // User is authenticated; auth.user contains the payload
  return new Response(
    JSON.stringify({
      message: "This is protected data",
      user: auth.user,
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    }
  );
}

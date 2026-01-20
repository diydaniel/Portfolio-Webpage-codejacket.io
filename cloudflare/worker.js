// cloudflare/worker.js

import { authStart } from "./auth/start.js";
import { authVerify } from "./auth/verify.js";
import { getCurrentUser } from "./auth/me.js";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    try {
      if (url.pathname === "/auth/start" && request.method === "POST") {
        return authStart(request, env);
      }

      if (url.pathname === "/auth/verify" && request.method === "GET") {
        return authVerify(request, env);
      }

      if (url.pathname === "/me" && request.method === "GET") {
        return getCurrentUser(request, env);
      }

      return new Response("Not found", { status: 404 });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: { "content-type": "application/json" },
      });
    }
  },
};

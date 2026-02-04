import { authStart } from "./auth/start.js";
import { authVerify } from "./auth/verify.js";
import { getCurrentUser } from "./auth/me.js";
import { logout } from "./auth/logout.js";
import { protectedHandler } from "./api/protected.js";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Allowed origins for CORS
    const allowedOrigin = request.headers.get("Origin");
    const CORS_WHITELIST = [
      "http://localhost:3000",
      "http://localhost:5173",     // add Vite default
      "https://codejacket.io",
    ];

    // Start with minimal CORS headers
    const corsHeaders = {
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    // If origin is whitelisted, echo it
    if (allowedOrigin && CORS_WHITELIST.includes(allowedOrigin)) {
      corsHeaders["Access-Control-Allow-Origin"] = allowedOrigin;
    }

    // Handle preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // Routing
      if (url.pathname === "/auth/start" && request.method === "POST") {
        const response = await authStart(request, env);
        return new Response(response.body, {
          status: response.status,
          headers: { ...corsHeaders, ...response.headers },
        });
      }

  if (url.pathname === "/auth/verify" && request.method === "GET") {
  const response = await authVerify(request, env);

  const setCookie = response.headers.get("Set-Cookie");

  return new Response(response.body, {
    status: response.status,
    headers: {
      ...corsHeaders,
      "Content-Type": response.headers.get("Content-Type") || "application/json",
      ...(setCookie ? { "Set-Cookie": setCookie } : {}),
    },
  });
}


      if (url.pathname === "/me" && request.method === "GET") {
        const response = await getCurrentUser(request, env);
        return new Response(response.body, {
          status: response.status,
          headers: { ...corsHeaders, ...response.headers },
        });
      }
      if (url.pathname === "/auth/logout" && request.method === "POST") {
        return logout(request, env);
      }
       if (url.pathname === "/api/protected" && request.method === "GET") {
        return protectedHandler(request, env);
      }

      if (url.pathname === "/auth/logout" && request.method === "POST") {
        const response = await logout(request, env);
        return new Response(response.body, {
          status: response.status,
          headers: { ...corsHeaders, ...response.headers },
        });
      }

      if (url.pathname === "/api/protected" && request.method === "GET") {
        const response = await protectedHandler(request, env);
        return new Response(response.body, {
          status: response.status,
          headers: { ...corsHeaders, ...response.headers },
        });
      }

      return new Response("Not found", {
        status: 404,
        headers: corsHeaders,
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      });
    }
  },
};


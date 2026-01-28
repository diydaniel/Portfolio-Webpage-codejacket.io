var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// cloudflare/utils/token.js
function generateToken() {
  return crypto.randomUUID().replace(/-/g, "");
}
__name(generateToken, "generateToken");
async function hashToken(token) {
  const data = new TextEncoder().encode(token);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash)).map((b) => b.toString(16).padStart(2, "0")).join("");
}
__name(hashToken, "hashToken");

// cloudflare/auth/start.js
async function authStart(request, env) {
  try {
    const { email } = await request.json();
    if (!email || !email.includes("@")) {
      return new Response(JSON.stringify({ error: "Invalid email" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const token = generateToken();
    const hashed = await hashToken(token);
    await env.LOGIN_TOKENS.put(`login:${hashed}`, email, {
      expirationTtl: 15 * 60
    });
    const appOrigin = env.APP_ORIGIN || "http://localhost:5173";
    const verifyUrl = `${appOrigin}/verify?token=${token}`;
    console.log("authStart APP_ORIGIN:", env.APP_ORIGIN);
    console.log("authStart appOrigin used:", appOrigin);
    console.log("authStart verifyUrl:", verifyUrl);
    const emailBody = {
      from: env.EMAIL_FROM,
      to: email,
      subject: "Your CodeJacket Login Link",
      html: `...${verifyUrl}...`
      // your existing HTML
    };
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.RESEND_API_KEY}`
      },
      body: JSON.stringify(emailBody)
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
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("authStart error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
__name(authStart, "authStart");

// cloudflare/utils/jwt.js
async function signJWT(payload, secret, ttl) {
  const header = { alg: "HS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1e3);
  const body = { ...payload, iat: now, exp: now + ttl };
  const encode = /* @__PURE__ */ __name((obj) => btoa(JSON.stringify(obj)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""), "encode");
  const unsigned = `${encode(header)}.${encode(body)}`;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sigBuffer = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(unsigned)
  );
  const signature = btoa(
    String.fromCharCode(...new Uint8Array(sigBuffer))
  ).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  return `${unsigned}.${signature}`;
}
__name(signJWT, "signJWT");
async function verifyJWT(token, secret) {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      throw new Error("Invalid token format");
    }
    const [headerB64, payloadB64, signatureB64] = parts;
    const unsigned = `${headerB64}.${payloadB64}`;
    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    const sigBuffer = await crypto.subtle.sign(
      "HMAC",
      key,
      new TextEncoder().encode(unsigned)
    );
    const computedB64 = btoa(
      String.fromCharCode(...new Uint8Array(sigBuffer))
    ).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    if (computedB64 !== signatureB64) {
      throw new Error("Invalid signature");
    }
    const padded = payloadB64.replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(atob(padded));
    const now = Math.floor(Date.now() / 1e3);
    if (payload.exp && payload.exp < now) {
      throw new Error("Token expired");
    }
    return payload;
  } catch (err) {
    throw new Error("JWT verification failed: " + err.message);
  }
}
__name(verifyJWT, "verifyJWT");

// cloudflare/auth/verify.js
async function authVerify(request, env) {
  try {
    const url = new URL(request.url);
    const token = url.searchParams.get("token");
    console.log("JWT secret length:", env.SESSION_JWT_SECRET?.length);
    if (!token) {
      return new Response(JSON.stringify({ error: "Missing token" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const hashed = await hashToken(token);
    const email = await env.LOGIN_TOKENS.get(`login:${hashed}`);
    if (!email) {
      return new Response(
        JSON.stringify({ error: "Invalid or expired token" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    await env.LOGIN_TOKENS.delete(`login:${hashed}`);
    const jwt = await signJWT(
      { email },
      env.SESSION_JWT_SECRET,
      60 * 60 * 24 * 7
      // 7 days
    );
    const cookieValue = [
      `cj_session=${jwt}`,
      "Path=/",
      "HttpOnly",
      "Secure",
      "SameSite=Lax",
      `Max-Age=${60 * 60 * 24 * 7}`
    ].join("; ");
    return new Response(JSON.stringify({ status: "ok", email }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": cookieValue
      }
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err && err.message ? err.message : String(err) }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}
__name(authVerify, "authVerify");

// cloudflare/auth/me.js
async function getCurrentUser(request, env) {
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
        headers: { "Content-Type": "application/json" }
      });
    }
    const payload = await verifyJWT(token, env.SESSION_JWT_SECRET);
    return new Response(JSON.stringify({ user: { email: payload.email } }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ user: null }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  }
}
__name(getCurrentUser, "getCurrentUser");

// cloudflare/auth/logout.js
async function logout(request, env) {
  const headers = new Headers();
  headers.append(
    "Set-Cookie",
    `cj_session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`
  );
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      ...Object.fromEntries(headers),
      "Content-Type": "application/json"
    }
  });
}
__name(logout, "logout");

// cloudflare/utils/auth.js
async function requireAuth(request, env) {
  const cookieHeader = request.headers.get("Cookie") || "";
  const cookies = Object.fromEntries(
    cookieHeader.split(";").map((c) => c.trim().split("=")).filter(([key, val]) => key && val)
  );
  const token = cookies["cj_session"];
  if (!token) {
    return { ok: false, status: 401, body: { error: "Not authenticated" } };
  }
  try {
    const payload = await verifyJWT(token, env.SESSION_JWT_SECRET);
    return { ok: true, user: payload };
  } catch (err) {
    return { ok: false, status: 401, body: { error: "Invalid session" } };
  }
}
__name(requireAuth, "requireAuth");

// cloudflare/api/protected.js
async function protectedHandler(request, env) {
  const auth = await requireAuth(request, env);
  if (!auth.ok) {
    return new Response(JSON.stringify(auth.body), {
      status: auth.status,
      headers: { "content-type": "application/json" }
    });
  }
  return new Response(
    JSON.stringify({
      message: "This is protected data",
      user: auth.user
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" }
    }
  );
}
__name(protectedHandler, "protectedHandler");

// cloudflare/worker.js
var worker_default = {
  async fetch(request, env) {
    const url = new URL(request.url);
    const allowedOrigin = request.headers.get("Origin");
    const CORS_WHITELIST = [
      "http://localhost:3000",
      "http://localhost:5173",
      // add Vite default
      "https://codejacket.io"
    ];
    const corsHeaders = {
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };
    if (allowedOrigin && CORS_WHITELIST.includes(allowedOrigin)) {
      corsHeaders["Access-Control-Allow-Origin"] = allowedOrigin;
    }
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }
    try {
      if (url.pathname === "/auth/start" && request.method === "POST") {
        const response = await authStart(request, env);
        return new Response(response.body, {
          status: response.status,
          headers: { ...corsHeaders, ...response.headers }
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
            ...setCookie ? { "Set-Cookie": setCookie } : {}
          }
        });
      }
      if (url.pathname === "/me" && request.method === "GET") {
        const response = await getCurrentUser(request, env);
        return new Response(response.body, {
          status: response.status,
          headers: { ...corsHeaders, ...response.headers }
        });
      }
      if (url.pathname === "/auth/logout" && request.method === "POST") {
        const response = await logout(request, env);
        return new Response(response.body, {
          status: response.status,
          headers: { ...corsHeaders, ...response.headers }
        });
      }
      if (url.pathname === "/api/protected" && request.method === "GET") {
        const response = await protectedHandler(request, env);
        return new Response(response.body, {
          status: response.status,
          headers: { ...corsHeaders, ...response.headers }
        });
      }
      return new Response("Not found", {
        status: 404,
        headers: corsHeaders
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders
        }
      });
    }
  }
};

// node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-TYFH2f/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = worker_default;

// node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-TYFH2f/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=worker.js.map

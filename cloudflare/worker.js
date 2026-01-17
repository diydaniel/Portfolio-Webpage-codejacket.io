export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Simple root healthcheck
    if (url.pathname === "/") {
      return new Response("API alive!", { status: 200 });
    }

    // Auth endpoints
    if (url.pathname === "/auth/start" && request.method === "POST") {
      return authStart(request, env);
    }
    if (url.pathname === "/auth/verify" && request.method === "GET") {
      return authVerify(request, env);
    }
    if (url.pathname === "/me" && request.method === "GET") {
      return me(request, env);
    }

    // Billing
    if (url.pathname === "/billing/checkout" && request.method === "POST") {
      return createCheckout(request, env);
    }
    if (url.pathname === "/stripe/webhook" && request.method === "POST") {
      return stripeWebhook(request, env);
    }

    // Protected product access
    if (url.pathname.startsWith("/download/") && request.method === "GET") {
      return handleDownload(request, env);
    }
    if (url.pathname.startsWith("/course/") && request.method === "GET") {
      return getCourseLessons(request, env);
    }

    return new Response("Not found", { status: 404 });
  },
};

async function authStart(request, env) { /* ... */ }
async function authVerify(request, env) { /* ... */ }
async function me(request, env) { /* ... */ }
async function createCheckout(request, env) { /* ... */ }
async function stripeWebhook(request, env) { /* ... */ }

async function handleDownload(request, env) { /* ... */ }
async function getCourseLessons(request, env) { /* ... */ }


await env.DB.prepare("SELECT * FROM users WHERE email = ?").bind(email).first();
await env.DB.prepare("INSERT INTO entitlements (...) VALUES (...)").run();


// 🛠 Migrating your D1 database

// Use Wrangler to run your migrations:

// Locally (for testing)
// npx wrangler d1 migrations apply DB --local

//Remote (production)
// npx wrangler d1 migrations apply DB --remote


// This applies your SQL schema to the actual D1 instance you’ll serve.

// 📍 Dev tips

// Always use migrations to version your schema — change safely over time.

// Use ENV variables for secrets (Stripe keys, session salts).

// Return consistent JSON shapes so your front end can consume them easily.
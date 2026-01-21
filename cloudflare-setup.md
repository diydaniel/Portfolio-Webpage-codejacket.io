---
title: Cloudflare Setup for CodeJacket API
author: Cannon (CodeJacket)
date: 2026-01-XX
geometry: margin=1in
mainfont: Georgia
monofont: "Courier New"
toc: true
toc-depth: 3
---

# Cloudflare Setup for CodeJacket API

This document outlines the steps taken to set up Cloudflare services in support of the CodeJacket API, including DNS delegation, Wrangler configuration, Worker deployment, KV namespace setup, and preliminary routing.

---

## 1. Prerequisites

Before beginning Cloudflare setup, ensure the following tools are installed:

### 1.1 Required Software

- **Node.js** (v16+)
- **npm** (v8+)
- **Wrangler (Cloudflare CLI)**  
  Install with:
  ```bash
  npm install --save-dev wrangler@latest
Pandoc

Log in at https://dash.cloudflare.com

Click Add Site

Enter your domain (e.g., codejacket.io)

Choose a plan (Free tier is sufficient for this workflow)

Cloudflare scans existing DNS records

2.2 Update Nameservers at Registrar

At your domain registrar (e.g., HostGator):

Go to domain management

Replace current nameservers with Cloudflare’s provided NS

Save changes

Wait for DNS propagation (typically minutes to hours)

Note:
The “Zone Editor” in HostGator’s cPanel is not where you change nameservers — this must be done at the registrar.

3. Install and Configure Wrangler
3.1 Initialize Wrangler

At your project root:

npx wrangler whoami


If not logged in:

npx wrangler login


This opens a browser tab for Cloudflare OAuth.

3.2 Create Wrangler Configuration

At the project root, create wrangler.toml:

name = "codejacket-api"
main = "./cloudflare/worker.js"
compatibility_date = "2026-01-01"

[vars]
APP_ORIGIN = "https://codejacket.io"
API_ORIGIN = "https://api.codejacket.io"
EMAIL_FROM = "CodeJacket <login@codejacket.io>"

[[kv_namespaces]]
binding = "LOGIN_TOKENS"
id = "<your-kv-namespace-id>"


Replace <your-kv-namespace-id> with the actual KV namespace ID.

4. Register Workers.dev Subdomain

The first time a Worker is deployed, Wrangler may prompt:

What would you like your workers.dev subdomain to be?


Recommended choice:

codejacket


This creates:

https://codejacket-api.codejacket.workers.dev

5. Create KV Namespace

Workers use Cloudflare KV to store magic link tokens.

npx wrangler kv namespace create "LOGIN_TOKENS"


Record the returned ID and insert into wrangler.toml.

6. Deploy Worker

From project root:

npx wrangler deploy


This uploads the Worker and makes it live at the workers.dev URL.

7. Project Folder Layout

Your project now should have this structure:

/
├── wrangler.toml
├── cloudflare/
│   ├── worker.js
│   ├── auth/
│   │   ├── start.js
│   │   ├── verify.js
│   │   └── me.js
│   └── utils/
├── migrations/
├── src/
├── package.json
└── README.md


Each route handler is modularized in its own file.

8. Routing Endpoints

Basic routing in cloudflare/worker.js:

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

9. Placeholder Handlers
9.1 auth/start.js
export async function authStart(request, env) {
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

9.2 auth/verify.js
export async function authVerify(request, env) {
  return new Response(JSON.stringify({ verified: true }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

9.3 auth/me.js
export async function getCurrentUser(request, env) {
  return new Response(JSON.stringify({ user: null }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

10. Testing Endpoints

Test with curl:

curl -X POST https://codejacket-api.codejacket.workers.dev/auth/start \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'


Expect:

{"ok":true}

11. Summary

By following these steps, you have:

Configured Cloudflare DNS

Installed Wrangler

Registered a workers.dev subdomain

Created a KV namespace

Deployed a Cloudflare Worker

Structured code modularly

Tested an authentication endpoint

12. Next Steps

Full auth implementation

Stripe billing routes

Webhook handlers

Content protection

Custom domain routing
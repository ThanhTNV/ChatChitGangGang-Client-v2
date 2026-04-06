# ChatChit Gang Gang (web)

A minimal **Next.js** browser app that signs in with **Keycloak** (OpenID Connect, authorization code + PKCE) and shows the authenticated **user profile**. Use it as a simple web client to exercise login and tokens while developing the stack.

## Related backend

API and server work live in **[ChatChitGangGang-Server-v2](https://github.com/ThanhTNV/ChatChitGangGang-Server-v2)**. Point Keycloak and your API env vars there to match this client’s realm and client id when you wire JWT validation and routes.

## Stack

- [Next.js](https://nextjs.org/) 15 (App Router), React 19, TypeScript
- [oidc-client-ts](https://github.com/authts/oidc-client-ts) for OIDC in the browser
- Tailwind CSS v4

## Prerequisites

- Node.js 20+ (recommended)
- Keycloak reachable from the browser (e.g. `http://localhost:8090`)
- A **public** OIDC client in your realm: **Standard flow**, **PKCE**, scopes including `openid`, `profile`, `email`

## Setup

1. Clone the repo and install dependencies:

   ```bash
   npm install
   ```

2. Copy environment template and edit values:

   ```bash
   cp .env.example .env.local
   ```

   On Windows (PowerShell): `Copy-Item .env.example .env.local`

   Set `NEXT_PUBLIC_KEYCLOAK_ISSUER` (realm issuer URL) and `NEXT_PUBLIC_KEYCLOAK_CLIENT_ID` to match your Keycloak client. Keep `NEXT_PUBLIC_APP_URL` aligned with where you run this app (default `http://localhost:3000`).

3. In Keycloak, allow redirects for this app, for example:

   - **Valid redirect URIs:** `http://localhost:3000/*`, `http://localhost:3000/auth/callback`
   - **Web origins:** `http://localhost:3000`
   - **Valid post logout redirect URIs:** `http://localhost:3000/`

   More detail: [docs/keycloak-browser.md](./docs/keycloak-browser.md).

## Scripts

| Command        | Description              |
| -------------- | ------------------------ |
| `npm run dev`  | Dev server (port 3000)   |
| `npm run build` | Production build        |
| `npm run start` | Run production server   |
| `npm run lint` | ESLint                   |

## What it does

- **/** — Shows “Log in” or, after OIDC completes, profile fields from the ID token / userinfo (e.g. `sub`, `preferred_username`, `name`, `email`).
- **/auth/callback** — Handles the OAuth redirect and returns the user to `/`.

Access tokens are kept by the OIDC library for future API calls (e.g. `Authorization: Bearer …` against the Go API in the server repo); the UI does not print the raw token.

## Documentation

- [Keycloak + browser (OIDC)](./docs/keycloak-browser.md)
- [Keycloak + Flutter / API env notes](./docs/keycloak-flutter.md)

## License

Private / unspecified — match the policy of your organization or add a `LICENSE` file if you open-source the repo.

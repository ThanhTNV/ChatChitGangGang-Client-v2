import type { UserManagerSettings } from "oidc-client-ts";

function required(name: string, value: string | undefined): string {
  if (!value?.trim()) {
    throw new Error(`Missing ${name}. Copy .env.example to .env.local and set OIDC variables.`);
  }
  return value.trim().replace(/\/$/, "");
}

export function getOidcSettings(): UserManagerSettings {
  const appUrl = required("NEXT_PUBLIC_APP_URL", process.env.NEXT_PUBLIC_APP_URL);
  const authority = required(
    "NEXT_PUBLIC_KEYCLOAK_ISSUER",
    process.env.NEXT_PUBLIC_KEYCLOAK_ISSUER,
  );
  const client_id = required(
    "NEXT_PUBLIC_KEYCLOAK_CLIENT_ID",
    process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID,
  );

  return {
    authority,
    client_id,
    redirect_uri: `${appUrl}/auth/callback`,
    post_logout_redirect_uri: `${appUrl}/`,
    response_type: "code",
    scope: "openid profile email",
    // Set true only if you add /auth/silent-callback and allow it in Keycloak redirect URIs
    automaticSilentRenew: false,
    loadUserInfo: true,
  };
}

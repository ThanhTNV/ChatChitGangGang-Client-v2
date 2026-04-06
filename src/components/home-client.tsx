"use client";

import { useCallback, useEffect, useState } from "react";
import type { User } from "oidc-client-ts";
import { getUserManager } from "@/lib/oidc/user-manager";

export function HomeClient() {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [actionError, setActionError] = useState<string | null>(null);

  const refresh = useCallback(() => {
    getUserManager()
      .getUser()
      .then(setUser)
      .catch(() => setUser(null));
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const login = () => {
    setActionError(null);
    getUserManager().signinRedirect().catch((e: unknown) => {
      setActionError(e instanceof Error ? e.message : "Login failed");
    });
  };

  const logout = () => {
    setActionError(null);
    getUserManager().signoutRedirect().catch((e: unknown) => {
      setActionError(e instanceof Error ? e.message : "Logout failed");
    });
  };

  if (user === undefined) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-8 text-center text-zinc-400">
        Checking session…
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center gap-6 rounded-xl border border-zinc-800 bg-zinc-900/50 p-10">
        <p className="text-center text-zinc-400">
          Sign in with Keycloak to load your OIDC profile (openid, profile, email).
        </p>
        {actionError ? <p className="text-sm text-red-400">{actionError}</p> : null}
        <button
          type="button"
          onClick={login}
          className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-500"
        >
          Log in
        </button>
      </div>
    );
  }

  const p = user.profile;
  const rows: { label: string; value: string | undefined }[] = [
    { label: "Subject (sub)", value: p.sub },
    { label: "Preferred username", value: p.preferred_username },
    { label: "Name", value: p.name },
    { label: "Email", value: p.email },
    { label: "Email verified", value: p.email_verified != null ? String(p.email_verified) : undefined },
    { label: "Given name", value: p.given_name },
    { label: "Family name", value: p.family_name },
  ].filter((r) => r.value != null && r.value !== "");

  return (
    <div className="w-full max-w-xl space-y-6">
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-8">
        <h2 className="mb-6 text-lg font-semibold text-zinc-100">User profile</h2>
        <dl className="space-y-4">
          {rows.map(({ label, value }) => (
            <div key={label} className="grid gap-1 sm:grid-cols-[10rem_1fr] sm:items-baseline">
              <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500">{label}</dt>
              <dd className="font-mono text-sm text-zinc-200 break-all">{value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-xs text-zinc-500">
          Access token is stored by the OIDC client for API calls; it is not shown here.
        </p>
      </div>
      {actionError ? <p className="text-center text-sm text-red-400">{actionError}</p> : null}
      <div className="flex justify-center gap-3">
        <button
          type="button"
          onClick={refresh}
          className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800"
        >
          Refresh session
        </button>
        <button
          type="button"
          onClick={logout}
          className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800"
        >
          Log out
        </button>
      </div>
    </div>
  );
}

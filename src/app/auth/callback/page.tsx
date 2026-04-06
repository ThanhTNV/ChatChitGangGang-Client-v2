"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserManager } from "@/lib/oidc/user-manager";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    getUserManager()
      .signinRedirectCallback()
      .then(() => {
        if (!cancelled) router.replace("/");
      })
      .catch((e: unknown) => {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Sign-in failed");
        }
      });
    return () => {
      cancelled = true;
    };
  }, [router]);

  if (error) {
    return (
      <main className="mx-auto flex min-h-screen max-w-lg flex-col justify-center gap-4 px-6">
        <h1 className="text-xl font-semibold text-red-400">Could not complete sign-in</h1>
        <p className="text-sm text-zinc-400">{error}</p>
        <Link className="text-indigo-400 underline" href="/">
          Back to home
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col justify-center px-6">
      <p className="text-zinc-400">Completing sign-in…</p>
    </main>
  );
}

import { HomeClient } from "@/components/home-client";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-16">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-50">ChatChit</h1>
        <p className="mt-2 text-sm text-zinc-500">Keycloak browser login (authorization code + PKCE)</p>
      </div>
      <HomeClient />
    </main>
  );
}

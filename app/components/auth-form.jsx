"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AuthForm() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function loadSession() {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    }

    loadSession();
  }, [supabase]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        setError(error.message);
      } else {
        router.push("/");
      }
    } catch (err) {
      setError(err?.message ?? "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    setError("");
    setIsLoading(true);

    const { error } = await supabase.auth.signOut();

    if (error) {
      setError(error.message);
      setIsLoading(false);
      return;
    }

    router.push("/");
  };

  return (
    <div className="min-h-screen bg-white text-black flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-3xl border border-black bg-white p-8 shadow-xl">
        <div className="mb-6">
          <h1 className="text-4xl font-semibold">{user ? "Account" : "Sign in"}</h1>
        </div>

        {user ? (
          <div className="space-y-4">
            <button
              type="button"
              onClick={handleSignOut}
              disabled={isLoading}
              className="w-full rounded-2xl bg-black px-4 py-3 text-sm font-semibold text-white"
            >
              {isLoading ? "Working…" : "Sign out"}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-sm font-medium text-zinc-900">
              Email
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 w-full rounded-xl border border-black px-4 py-3 outline-none bg-white"
                required
              />
            </label>

            <label className="block text-sm font-medium text-zinc-900">
              Password
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-2 w-full rounded-xl border border-black px-4 py-3 outline-none bg-white"
                required
              />
            </label>

            {error && <div className="text-sm text-red-600">{error}</div>}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-2xl bg-black px-4 py-3 text-sm font-semibold text-white"
            >
              {isLoading ? "Working…" : "Sign in"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

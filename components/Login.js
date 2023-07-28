"use client";

import { useUser } from "@/hooks/useUser";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

// Supabase auth needs to be triggered client-side
export default function Login({ session }) {
  const supabase = createClientComponentClient();
  const { user } = useUser();
  const router = useRouter();

  const handleEmailLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email: "jon@supabase.com",
      password: "password",
    });
    router.refresh();

    if (error) {
      console.log({ error });
    }
  };

  const handleGitHubLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (data) {
      router.refresh();
    }

    if (error) {
      console.log({ error });
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    router.refresh();

    if (error) {
      console.log({ error });
    }
  };

  // this `session` is from the root loader - server-side
  // therefore, it can safely be used to conditionally render
  // SSR pages without issues with hydration
  return user ? (
    <button onClick={handleLogout}>Logout</button>
  ) : (
    <>
      <button onClick={handleEmailLogin}>Email Login</button>
      <button onClick={handleGitHubLogin}>Google Login</button>
    </>
  );
}

"use client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function SignOutButton() {
  const router = useRouter();
  const supabase = createClient();

  const signOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <button
      onClick={signOut}
      title="Sign out"
      className="text-white/40 hover:text-white transition-colors p-1"
    >
      <LogOut className="w-3.5 h-3.5" />
    </button>
  );
}

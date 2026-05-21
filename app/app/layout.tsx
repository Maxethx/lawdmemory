import { redirect } from "next/navigation";
import Link from "next/link";
import Logo from "@/components/Logo";
import { createClient } from "@/lib/supabase/server";
import { SignOutButton } from "./SignOutButton";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const handle = user.user_metadata?.user_name ?? user.email?.split("@")[0] ?? "user";
  const avatar = user.user_metadata?.avatar_url as string | undefined;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* App nav */}
      <header className="sticky top-0 z-40 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center gap-4">
          <Link href="/app" className="flex items-center gap-2.5 group">
            <Logo size={26} className="group-hover:opacity-80 transition-opacity" />
            <span className="font-bold text-sm tracking-tight text-white hidden sm:block">
              Lawd<span className="text-white/50 font-normal">Memory</span>
            </span>
            <span className="ml-1 px-1.5 py-0.5 text-[9px] font-mono uppercase tracking-[0.15em] text-white/55 border border-white/10 rounded bg-white/[0.02]">
              app
            </span>
          </Link>

          <div className="ml-auto flex items-center gap-3">
            <Link href="/docs" className="text-xs text-white/45 hover:text-white transition-colors font-medium">
              Docs
            </Link>
            <Link href="/" className="text-xs text-white/45 hover:text-white transition-colors font-medium">
              Home
            </Link>

            <div className="flex items-center gap-2 pl-3 ml-1 border-l border-white/8">
              {avatar && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={avatar}
                  alt={handle}
                  className="w-6 h-6 rounded-full border border-white/15"
                />
              )}
              <span className="text-xs font-mono text-white/70">{handle}</span>
              <SignOutButton />
            </div>
          </div>
        </div>
      </header>

      {children}
    </div>
  );
}

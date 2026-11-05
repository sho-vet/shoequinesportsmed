import Link from "next/link";
import { redirect } from "next/navigation";
import { Logo } from "@/components/Logo";
import { Container } from "@/components/ui/Container";
import { createClient } from "@/lib/supabase/server";

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Defense in depth: middleware already gates /portal, this covers direct/SSR edge cases.
  if (!user) redirect("/login?redirectTo=/portal");

  return (
    <div className="flex min-h-screen flex-col bg-navy-50/40">
      <header className="border-b border-line bg-white">
        <Container className="flex h-16 items-center justify-between">
          <Link href="/portal" className="flex items-center gap-2">
            <Logo />
            <span className="text-sm font-bold uppercase tracking-wide text-navy">Portal de Propietarios</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-ink/60 sm:inline">{user.email}</span>
            <form action="/api/auth/signout" method="post">
              <button type="submit" className="text-sm font-medium text-ink/70 hover:text-navy">
                Cerrar sesión
              </button>
            </form>
          </div>
        </Container>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}

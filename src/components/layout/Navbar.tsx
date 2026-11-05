import Link from "next/link";
import { Logo } from "@/components/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/educacion-continuada", label: "Educación Continuada" },
  { href: "/#empresas-colaboradoras", label: "Empresas Colaboradoras" },
  { href: "/contacto", label: "Contacto" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2" aria-label="SHO Equine Sports Medicine — Inicio">
          <Logo />
          <span className="text-sm font-bold uppercase tracking-wide text-navy sm:text-base">
            SHO <span className="font-normal text-ink/70">Equine Sports Medicine</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Navegación principal">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink/80 transition-colors hover:text-navy"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <ButtonLink href="/login" variant="primary" className="text-xs sm:text-sm">
          Acceso Propietarios
        </ButtonLink>
      </Container>
    </header>
  );
}

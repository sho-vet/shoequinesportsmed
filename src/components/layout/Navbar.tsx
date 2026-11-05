"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
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
  const [open, setOpen] = useState(false);

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

        <div className="flex items-center gap-2">
          <ButtonLink href="/login" variant="primary" className="hidden text-xs sm:inline-flex sm:text-sm">
            Acceso Propietarios
          </ButtonLink>
          <ButtonLink href="/login" variant="primary" className="px-3 py-2 text-xs sm:hidden">
            Acceso
          </ButtonLink>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className="rounded-card p-2 text-navy hover:bg-navy-50 md:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </Container>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Navegación principal móvil"
          className="border-t border-line bg-white md:hidden"
        >
          <Container className="flex flex-col py-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-3 text-sm font-medium text-ink/80 hover:text-navy"
              >
                {link.label}
              </Link>
            ))}
          </Container>
        </nav>
      )}
    </header>
  );
}

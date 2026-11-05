import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <Container className="flex flex-col gap-6 py-10 text-sm text-ink/70 sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {new Date().getFullYear()} SHO Equine Sports Medicine. Todos los derechos reservados.</p>
        <nav className="flex flex-wrap gap-6" aria-label="Enlaces legales">
          <Link href="/pagos" className="hover:text-navy">
            Pagos
          </Link>
          <Link href="/privacidad" className="hover:text-navy">
            Política de Privacidad
          </Link>
          <Link href="/terminos" className="hover:text-navy">
            Términos y Condiciones
          </Link>
          <Link href="/contacto" className="hover:text-navy">
            Contacto
          </Link>
        </nav>
      </Container>
    </footer>
  );
}

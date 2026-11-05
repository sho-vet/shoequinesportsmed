import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/Logo";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white">
      <Container className="flex flex-col items-center text-center">
        <Logo className="h-12 w-12" />
        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-clay-600">Error 404</p>
        <h1 className="mt-3 text-3xl font-bold text-navy sm:text-4xl">No encontramos esta página</h1>
        <p className="mt-3 max-w-md text-ink/70">
          El enlace puede estar roto o la página fue movida. Vuelve al inicio o escríbenos si crees que esto
          es un error.
        </p>
        <div className="mt-8 flex gap-4">
          <ButtonLink href="/">Volver al inicio</ButtonLink>
          <ButtonLink href="/contacto" variant="secondary">
            Contactar
          </ButtonLink>
        </div>
      </Container>
    </div>
  );
}

import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy">
      <Container className="relative grid min-h-[560px] items-center gap-10 py-20 lg:grid-cols-2">
        <div className="relative z-10 text-white">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-clay-50/90">
            Medicina Deportiva Equina
          </p>
          <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            Cuidado especializado para caballos de alto rendimiento
          </h1>
          <p className="mt-5 max-w-lg text-base text-white/80">
            Diagnóstico, rehabilitación y seguimiento clínico de precisión, respaldado por historias
            clínicas digitales y comunicación directa con tu veterinario.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <ButtonLink href="/login" variant="secondary" className="bg-white">
              Acceso Propietarios
            </ButtonLink>
            <ButtonLink href="/contacto" variant="ghost" className="text-white hover:text-clay-50">
              Agendar una consulta
            </ButtonLink>
          </div>
        </div>

        <div className="relative hidden h-full min-h-[360px] lg:block">
          {/*
            Replace with a real photo of a sport horse (e.g. public/images/hero-horse.jpg).
            Keep descriptive alt text — this is a content image, not decorative.
          */}
          <Image
            src="/images/hero-horse.svg"
            alt="Caballo de salto en plena competencia, ejemplo de deporte ecuestre de alto rendimiento"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 0px"
            className="object-contain"
          />
        </div>
      </Container>
    </section>
  );
}

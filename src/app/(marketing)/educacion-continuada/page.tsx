import Image from "next/image";
import Link from "next/link";
import { articulos } from "@/data/articulos";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Educación Continuada",
  description:
    "Artículos especializados, videos educativos y casos clínicos reales sobre medicina deportiva equina.",
  path: "/educacion-continuada",
});

const formatoLabel: Record<string, string> = {
  articulo: "Artículo",
  video: "Video",
  "caso-clinico": "Caso clínico",
};

export default function EducacionContinuadaPage() {
  return (
    <Container className="py-16">
      <SectionHeading
        eyebrow="Educación Continuada"
        title="Conocimiento clínico al servicio del deporte ecuestre"
        description="Artículos, videos y casos clínicos reales, pensados para propietarios, jinetes y veterinarios."
      />

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {articulos.map((articulo) => (
          <Link
            key={articulo.slug}
            href={`/educacion-continuada/${articulo.slug}`}
            className="group overflow-hidden rounded-card border border-line bg-white shadow-card transition-shadow hover:shadow-md"
          >
            <div className="relative h-44 w-full">
              <Image
                src={articulo.imagen}
                alt={articulo.titulo}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="p-5">
              <span className="text-xs font-semibold uppercase tracking-wide text-clay-600">
                {formatoLabel[articulo.formato]}
              </span>
              <h3 className="mt-2 text-base font-semibold text-navy group-hover:underline">
                {articulo.titulo}
              </h3>
              <p className="mt-2 text-sm text-ink/70">{articulo.resumen}</p>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
}

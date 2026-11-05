import Image from "next/image";
import { notFound } from "next/navigation";
import { articulos, getArticuloBySlug } from "@/data/articulos";
import { Container } from "@/components/ui/Container";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return articulos.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const articulo = getArticuloBySlug(params.slug);
  if (!articulo) return pageMetadata({ title: "No encontrado", description: "Artículo no encontrado.", noIndex: true });
  return pageMetadata({
    title: articulo.titulo,
    description: articulo.resumen,
    path: `/educacion-continuada/${articulo.slug}`,
  });
}

export default function ArticuloPage({ params }: { params: { slug: string } }) {
  const articulo = getArticuloBySlug(params.slug);
  if (!articulo) notFound();

  return (
    <Container className="max-w-3xl py-16">
      <p className="text-xs font-semibold uppercase tracking-wide text-clay-600">
        {new Date(articulo.fecha).toLocaleDateString("es-CO", { year: "numeric", month: "long", day: "numeric" })}
      </p>
      <h1 className="mt-2 text-3xl font-bold text-navy">{articulo.titulo}</h1>

      <div className="relative mt-8 h-64 w-full overflow-hidden rounded-card sm:h-80">
        <Image src={articulo.imagen} alt={articulo.titulo} fill className="object-cover" />
      </div>

      <p className="mt-8 text-base leading-relaxed text-ink/80">{articulo.contenido}</p>
    </Container>
  );
}

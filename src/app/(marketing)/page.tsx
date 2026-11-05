import { Hero } from "@/components/home/Hero";
import { PartnersStrip } from "@/components/home/PartnersStrip";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Inicio",
  description:
    "Clínica de medicina deportiva equina especializada en diagnóstico, rehabilitación y seguimiento clínico para caballos de alto rendimiento.",
  path: "/",
});

const pilares = [
  {
    titulo: "Diagnóstico por imagen",
    texto: "Radiografía, ecografía y endoscopia interpretadas por especialistas en deporte equino.",
  },
  {
    titulo: "Historia clínica digital",
    texto: "Cada caballo con su registro cronológico de atenciones, vacunas y procedimientos, siempre accesible.",
  },
  {
    titulo: "Comunicación directa",
    texto: "Chat integrado con el veterinario tratante dentro del perfil de cada paciente.",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="py-20">
        <Container>
          <SectionHeading
            eyebrow="Nuestro enfoque"
            title="Medicina deportiva equina basada en evidencia"
            description="Acompañamos a propietarios y jinetes con un proceso clínico claro, trazable y centrado en el rendimiento del caballo."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {pilares.map((p) => (
              <Card key={p.titulo}>
                <h3 className="text-lg font-semibold text-navy">{p.titulo}</h3>
                <p className="mt-2 text-sm text-ink/70">{p.texto}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <PartnersStrip />
    </>
  );
}

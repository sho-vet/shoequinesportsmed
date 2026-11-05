import { ContactForm } from "@/components/ContactForm";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contacto",
  description: "Escríbenos para agendar una consulta de medicina deportiva equina o resolver tus dudas.",
  path: "/contacto",
});

export default function ContactoPage() {
  return (
    <Container className="py-16">
      <SectionHeading
        eyebrow="Contacto"
        title="Hablemos del rendimiento de tu caballo"
        description="Responde el formulario y nuestro equipo te contactará en menos de 24 horas hábiles."
      />
      <div className="mx-auto mt-10 max-w-xl">
        <Card>
          <ContactForm />
        </Card>
      </div>
    </Container>
  );
}

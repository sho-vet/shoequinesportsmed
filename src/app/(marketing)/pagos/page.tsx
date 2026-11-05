import { PaymentButtons } from "@/components/PaymentButtons";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Pagos",
  description: "Paga tu consulta o procedimiento desde Colombia, Ecuador, Perú o Estados Unidos.",
  path: "/pagos",
});

export default function PagosPage() {
  return (
    <Container className="py-16">
      <SectionHeading
        eyebrow="Pagos"
        title="Paga tu consulta desde tu país"
        description="Selecciona tu país para pagar con el método local correspondiente. Serás redirigido a una pasarela de pago segura."
      />
      <div className="mx-auto mt-10 max-w-xl">
        <Card>
          <PaymentButtons />
          <p className="mt-4 text-xs text-ink/50">
            No almacenamos datos de tarjetas en este sitio: cada botón te lleva directamente a la pasarela de
            pago de tu país.
          </p>
        </Card>
      </div>
    </Container>
  );
}

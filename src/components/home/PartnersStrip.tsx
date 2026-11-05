import { Container } from "@/components/ui/Container";

// TODO: replace href="#" with each partner's real official site before launch.
const partners = [
  { name: "MARE", href: "#" },
  { name: "ANIMAL SPORTS", href: "#" },
  { name: "TIENDA HERRAJES", href: "#" },
];

export function PartnersStrip() {
  return (
    <section id="empresas-colaboradoras" className="border-y border-line bg-white py-14">
      <Container>
        <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.2em] text-ink/50">
          Empresas Colaboradoras
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {partners.map((partner) => (
            <a
              key={partner.name}
              href={partner.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-bold uppercase tracking-wide text-ink/60 transition-colors hover:text-navy"
            >
              {partner.name}
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}

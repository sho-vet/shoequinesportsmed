import { HorseCard } from "@/components/portal/HorseCard";
import { Container } from "@/components/ui/Container";
import { createClient } from "@/lib/supabase/server";
import type { Caballo } from "@/types";

export const metadata = { title: "Mis Caballos", robots: { index: false, follow: false } };

export default async function PortalPage() {
  const supabase = createClient();
  const { data: caballos } = await supabase
    .from("caballos")
    .select("*")
    .order("nombre") as { data: Caballo[] | null };

  return (
    <Container className="py-10">
      <h1 className="text-2xl font-bold text-navy">Mis Caballos</h1>
      <p className="mt-1 text-sm text-ink/60">Selecciona un caballo para ver su historia clínica.</p>

      {!caballos || caballos.length === 0 ? (
        <p className="mt-10 text-sm text-ink/60">
          Todavía no tienes caballos registrados. Contacta a la clínica para vincular tus pacientes a tu
          cuenta.
        </p>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {caballos.map((caballo) => (
            <HorseCard key={caballo.id} caballo={caballo} />
          ))}
        </div>
      )}
    </Container>
  );
}

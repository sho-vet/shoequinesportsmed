import Image from "next/image";
import { notFound } from "next/navigation";
import { ChatPanel } from "@/components/portal/ChatPanel";
import { DiagnosticImageViewer } from "@/components/portal/DiagnosticImageViewer";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { createClient } from "@/lib/supabase/server";
import type { Caballo, ImagenDiagnostica, MensajeChat, RegistroClinico } from "@/types";

const tipoAtencionLabel: Record<string, string> = {
  consulta: "Consulta",
  vacunacion: "Vacunación",
  procedimiento: "Procedimiento",
  seguimiento: "Seguimiento",
};

export default async function CaballoPage({ params }: { params: { id: string } }) {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();
  const { data: caballo } = await supabase
    .from("caballos")
    .select("*")
    .eq("id", params.id)
    .single() as { data: Caballo | null };

  if (!caballo || !user) notFound();

  const [{ data: registros }, { data: imagenes }, { data: mensajes }] = await Promise.all([
    supabase.from("registros_clinicos").select("*").eq("caballo_id", params.id).order("fecha", { ascending: false }),
    supabase.from("imagenes_diagnosticas").select("*").eq("caballo_id", params.id).order("fecha", { ascending: false }),
    supabase.from("mensajes_chat").select("*").eq("caballo_id", params.id).order("created_at", { ascending: true }),
  ]);

  return (
    <Container className="space-y-10 py-10">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-full bg-navy-50">
          <Image
            src={caballo.foto_url || "/images/caballo-placeholder.svg"}
            alt={`Foto de ${caballo.nombre}`}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-navy">{caballo.nombre}</h1>
          <p className="text-sm text-ink/60">
            {caballo.disciplina || "Sin disciplina"} · {caballo.edad ? `${caballo.edad} años` : "Edad no registrada"} ·{" "}
            {caballo.peso_kg ? `${caballo.peso_kg} kg` : "Peso no registrado"}
          </p>
        </div>
      </div>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-navy">Imágenes diagnósticas</h2>
        <DiagnosticImageViewer imagenes={(imagenes as ImagenDiagnostica[]) || []} />
      </section>

      <div className="grid gap-10 lg:grid-cols-2">
        <section>
          <h2 className="mb-4 text-lg font-semibold text-navy">Historial de atenciones</h2>
          <div className="space-y-3">
            {((registros as RegistroClinico[]) || []).length === 0 && (
              <p className="text-sm text-ink/60">Sin registros clínicos todavía.</p>
            )}
            {((registros as RegistroClinico[]) || []).map((registro) => (
              <Card key={registro.id} className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wide text-clay-600">
                    {tipoAtencionLabel[registro.tipo]}
                  </span>
                  <span className="text-xs text-ink/50">
                    {new Date(registro.fecha).toLocaleDateString("es-CO")}
                  </span>
                </div>
                <h3 className="mt-1 font-medium text-navy">{registro.titulo}</h3>
                {registro.descripcion && <p className="mt-1 text-sm text-ink/70">{registro.descripcion}</p>}
                {registro.veterinario && (
                  <p className="mt-2 text-xs text-ink/50">Dr(a). {registro.veterinario}</p>
                )}
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-lg font-semibold text-navy">Consultas con el veterinario</h2>
          <ChatPanel
            caballoId={caballo.id}
            initialMessages={(mensajes as MensajeChat[]) || []}
            userId={user.id}
          />
        </section>
      </div>
    </Container>
  );
}

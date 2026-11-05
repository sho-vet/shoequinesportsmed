"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { chatMessageSchema } from "@/lib/validations";
import type { MensajeChat } from "@/types";
import { Button } from "@/components/ui/Button";

export function ChatPanel({
  caballoId,
  initialMessages,
  userId,
}: {
  caballoId: string;
  initialMessages: MensajeChat[];
  userId: string;
}) {
  const [messages, setMessages] = useState<MensajeChat[]>(initialMessages);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  useEffect(() => {
    const channel = supabase
      .channel(`chat-caballo-${caballoId}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "mensajes_chat", filter: `caballo_id=eq.${caballoId}` },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as MensajeChat]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [caballoId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  const send = async () => {
    const parsed = chatMessageSchema.safeParse({ contenido: draft });
    if (!parsed.success) return;

    setSending(true);
    await supabase.from("mensajes_chat").insert({
      caballo_id: caballoId,
      autor_id: userId,
      autor_rol: "propietario",
      contenido: parsed.data.contenido,
    });
    setDraft("");
    setSending(false);
  };

  return (
    <div className="flex h-96 flex-col rounded-card border border-line bg-white">
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.length === 0 && <p className="text-sm text-ink/50">Aún no hay mensajes. Escribe la primera consulta.</p>}
        {messages.map((m) => (
          <div
            key={m.id}
            className={`max-w-[80%] rounded-card px-3 py-2 text-sm ${
              m.autor_rol === "veterinario" ? "bg-navy-50 text-navy" : "ml-auto bg-navy text-white"
            }`}
          >
            <p>{m.contenido}</p>
            <p className="mt-1 text-[10px] opacity-60">
              {new Date(m.created_at).toLocaleString("es-CO")}
            </p>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void send();
        }}
        className="flex gap-2 border-t border-line p-3"
      >
        <label htmlFor="chat-input" className="sr-only">
          Escribe un mensaje para el veterinario
        </label>
        <input
          id="chat-input"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Escribe tu consulta..."
          className="flex-1 rounded-card border border-line px-3 py-2 text-sm focus:border-navy focus:outline-none"
        />
        <Button type="submit" disabled={sending || draft.trim().length === 0}>
          Enviar
        </Button>
      </form>
    </div>
  );
}

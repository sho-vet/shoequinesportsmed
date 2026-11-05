"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { contactSchema, type ContactInput } from "@/lib/validations";
import { Button } from "@/components/ui/Button";

const inputClass =
  "w-full rounded-card border border-line bg-white px-4 py-2.5 text-sm text-ink placeholder:text-ink/40 focus:border-navy focus:outline-none";
const errorClass = "mt-1 text-xs text-red-600";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactInput) => {
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("request-failed");
      setStatus("sent");
      reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <p role="status" className="rounded-card border border-line bg-navy-50 p-4 text-sm text-navy">
        Gracias por escribirnos. Te responderemos a la brevedad.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div>
        <label htmlFor="nombre" className="mb-1 block text-sm font-medium text-ink">
          Nombre completo
        </label>
        <input id="nombre" className={inputClass} {...register("nombre")} />
        {errors.nombre && <p className={errorClass}>{errors.nombre.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-ink">
          Correo electrónico
        </label>
        <input id="email" type="email" className={inputClass} {...register("email")} />
        {errors.email && <p className={errorClass}>{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="telefono" className="mb-1 block text-sm font-medium text-ink">
          Teléfono (opcional)
        </label>
        <input id="telefono" className={inputClass} {...register("telefono")} />
      </div>

      <div>
        <label htmlFor="mensaje" className="mb-1 block text-sm font-medium text-ink">
          Mensaje
        </label>
        <textarea id="mensaje" rows={5} className={inputClass} {...register("mensaje")} />
        {errors.mensaje && <p className={errorClass}>{errors.mensaje.message}</p>}
      </div>

      {/* Honeypot: hidden from real visitors via CSS, bots fill every field they can see in the DOM. */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="empresa_web">No completar este campo</label>
        <input id="empresa_web" tabIndex={-1} autoComplete="off" {...register("empresa_web")} />
      </div>

      <Button type="submit" disabled={status === "sending"} className="w-full sm:w-auto">
        {status === "sending" ? "Enviando..." : "Enviar mensaje"}
      </Button>
      {status === "error" && (
        <p role="alert" className="text-sm text-red-600">
          Ocurrió un error al enviar tu mensaje. Intenta de nuevo o escríbenos directamente por correo.
        </p>
      )}
    </form>
  );
}

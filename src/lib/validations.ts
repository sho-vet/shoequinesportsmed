import { z } from "zod";

export const contactSchema = z.object({
  nombre: z.string().trim().min(2, "Ingresa tu nombre completo.").max(100),
  email: z.string().trim().email("Ingresa un correo válido."),
  telefono: z.string().trim().max(30).optional().or(z.literal("")),
  mensaje: z.string().trim().min(10, "Cuéntanos un poco más (mínimo 10 caracteres).").max(2000),
  // Honeypot: real users never fill this (it's visually hidden). Non-empty = bot.
  empresa_web: z.string().max(0, "Spam detectado.").optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const loginSchema = z.object({
  email: z.string().trim().email("Ingresa un correo válido."),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres."),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const chatMessageSchema = z.object({
  contenido: z.string().trim().min(1).max(1000),
});

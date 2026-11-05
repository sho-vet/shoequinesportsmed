import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";

/**
 * Validates and (optionally) forwards the contact form. Re-validates on the
 * server — client-side validation alone is not spam/abuse protection.
 * Wire this up to email (e.g. Resend) or insert into Supabase once you have
 * credentials; for now it just validates + logs so nothing is lost silently.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  // Honeypot caught a bot — pretend success so bots don't learn to adapt.
  if (parsed.data.empresa_web) {
    return NextResponse.json({ ok: true });
  }

  // TODO: send via your email provider or insert into Supabase, e.g.:
  // const supabase = createAdminClient();
  // await supabase.from("mensajes_contacto").insert({ ...parsed.data });
  console.log("Nuevo mensaje de contacto:", {
    nombre: parsed.data.nombre,
    email: parsed.data.email,
  });

  return NextResponse.json({ ok: true });
}

import { Suspense } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Acceso Propietarios",
  description: "Ingresa al Portal de Propietarios para ver el historial clínico de tus caballos.",
  path: "/login",
  noIndex: true,
});

export default function LoginPage() {
  return (
    <Container className="flex min-h-[70vh] items-center justify-center py-16">
      <div className="w-full max-w-sm">
        <h1 className="mb-1 text-center text-2xl font-bold text-navy">Acceso Propietarios</h1>
        <p className="mb-8 text-center text-sm text-ink/60">
          Ingresa con tu correo y contraseña para ver tus caballos.
        </p>
        <Card>
          <Suspense>
            <LoginForm />
          </Suspense>
        </Card>
      </div>
    </Container>
  );
}

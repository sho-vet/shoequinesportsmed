import { Container } from "@/components/ui/Container";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Política de Privacidad",
  description: "Cómo SHO Equine Sports Medicine recopila, usa y protege tus datos y los de tus caballos.",
  path: "/privacidad",
});

export default function PrivacidadPage() {
  return (
    <Container className="max-w-3xl py-16">
      <h1 className="text-3xl font-bold text-navy">Política de Privacidad</h1>
      <p className="mt-2 text-sm text-ink/50">
        Última actualización: {new Date().toLocaleDateString("es-CO", { year: "numeric", month: "long", day: "numeric" })}
      </p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-ink/80">
        <p>
          <strong>
            Este documento es una plantilla inicial. Antes de publicar el sitio, pídele a un abogado que la
            revise y la adapte a la normativa de protección de datos de cada país donde operas (p. ej. Ley
            1581 de 2012 en Colombia, y las leyes aplicables en Ecuador, Perú y Estados Unidos).
          </strong>
        </p>

        <section>
          <h2 className="text-lg font-semibold text-navy">1. Responsable del tratamiento</h2>
          <p className="mt-2">
            SHO Equine Sports Medicine ("SHO", "nosotros") es responsable del tratamiento de los datos
            personales recolectados a través de este sitio y del Portal de Propietarios.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-navy">2. Datos que recopilamos</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Datos de contacto: nombre, correo electrónico, teléfono.</li>
            <li>Datos de cuenta: credenciales de acceso al Portal de Propietarios.</li>
            <li>
              Datos clínicos de los caballos registrados: historia clínica, vacunaciones, imágenes
              diagnósticas (radiografías, ecografías, endoscopias) y mensajes enviados a través del chat
              interno.
            </li>
            <li>Datos de uso del sitio recopilados mediante cookies (ver sección 5).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-navy">3. Finalidad del tratamiento</h2>
          <p className="mt-2">
            Usamos estos datos para prestar el servicio clínico, mantener la historia clínica digital de cada
            caballo, comunicarnos contigo, procesar pagos y cumplir obligaciones legales y regulatorias.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-navy">4. Con quién compartimos información</h2>
          <p className="mt-2">
            Usamos proveedores de infraestructura (como Supabase, para base de datos, autenticación y
            almacenamiento de imágenes) y, si los activas, proveedores de analítica web y pasarelas de pago
            por país. No vendemos tus datos ni los de tus caballos a terceros.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-navy">5. Cookies</h2>
          <p className="mt-2">
            Usamos cookies esenciales para el funcionamiento del sitio y, solo si lo aceptas en el banner de
            cookies, cookies analíticas para entender el uso del sitio. Puedes cambiar tu elección borrando las
            cookies del navegador.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-navy">6. Seguridad</h2>
          <p className="mt-2">
            Las imágenes diagnósticas y la historia clínica solo son visibles para el propietario registrado del
            caballo y el personal veterinario autorizado, mediante controles de acceso a nivel de base de
            datos. Las credenciales y llaves de nuestros proveedores nunca se exponen en el código del sitio.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-navy">7. Tus derechos</h2>
          <p className="mt-2">
            Puedes solicitar acceso, corrección o eliminación de tus datos y los de tus caballos escribiendo a{" "}
            <a href="/contacto" className="text-navy underline">
              nuestro formulario de contacto
            </a>
            .
          </p>
        </section>
      </div>
    </Container>
  );
}

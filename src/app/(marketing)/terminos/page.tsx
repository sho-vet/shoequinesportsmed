import { Container } from "@/components/ui/Container";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Términos y Condiciones",
  description: "Condiciones de uso del sitio web y del Portal de Propietarios de SHO Equine Sports Medicine.",
  path: "/terminos",
});

export default function TerminosPage() {
  return (
    <Container className="max-w-3xl py-16">
      <h1 className="text-3xl font-bold text-navy">Términos y Condiciones</h1>
      <p className="mt-2 text-sm text-ink/50">
        Última actualización: {new Date().toLocaleDateString("es-CO", { year: "numeric", month: "long", day: "numeric" })}
      </p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-ink/80">
        <p>
          <strong>
            Esta es una plantilla inicial. Pide revisión legal antes de publicarla, especialmente en lo
            relativo a responsabilidad clínica veterinaria y a los pagos por país.
          </strong>
        </p>

        <section>
          <h2 className="text-lg font-semibold text-navy">1. Aceptación</h2>
          <p className="mt-2">
            Al usar este sitio o el Portal de Propietarios aceptas estos términos. Si no estás de acuerdo, no
            uses el sitio.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-navy">2. Uso del Portal de Propietarios</h2>
          <p className="mt-2">
            El acceso es personal e intransferible. Eres responsable de mantener la confidencialidad de tus
            credenciales y de toda actividad realizada desde tu cuenta.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-navy">3. Naturaleza del contenido clínico</h2>
          <p className="mt-2">
            La información publicada en la sección de Educación Continuada tiene fines informativos y no
            sustituye una valoración veterinaria individual. Las decisiones clínicas sobre un caballo específico
            deben basarse en la evaluación directa de nuestro equipo veterinario.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-navy">4. Pagos</h2>
          <p className="mt-2">
            Los pagos se procesan a través de pasarelas de terceros según el país seleccionado. SHO no
            almacena datos de tarjetas ni otra información financiera sensible en este sitio.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-navy">5. Propiedad intelectual</h2>
          <p className="mt-2">
            El contenido educativo, marca y diseño de este sitio son propiedad de SHO Equine Sports Medicine,
            salvo que se indique lo contrario.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-navy">6. Cambios</h2>
          <p className="mt-2">
            Podemos actualizar estos términos periódicamente. Publicaremos la fecha de la última actualización
            en esta misma página.
          </p>
        </section>
      </div>
    </Container>
  );
}

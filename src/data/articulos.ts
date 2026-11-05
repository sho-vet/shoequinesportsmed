import type { ArticuloEducativo } from "@/types";

/**
 * Sample content so the section has something to render. Replace with a
 * real source (a Supabase table, or a headless CMS) once you have one —
 * the page components only depend on the ArticuloEducativo shape.
 */
export const articulos: ArticuloEducativo[] = [
  {
    slug: "prevencion-lesiones-tendinosas",
    titulo: "Prevención de lesiones tendinosas en caballos de salto",
    resumen: "Factores de riesgo y protocolos de calentamiento que reducen la incidencia de tendinopatías.",
    formato: "articulo",
    fecha: "2026-09-02",
    imagen: "/images/articulo-tendones.svg",
    contenido:
      "Las lesiones tendinosas son una de las causas más frecuentes de retiro temporal en caballos de salto de alto rendimiento. Un programa de calentamiento progresivo, superficies de entrenamiento adecuadas y el monitoreo ecográfico periódico permiten detectar cambios subclínicos antes de que se conviertan en una lesión manifiesta.",
  },
  {
    slug: "lectura-radiografias-articulares",
    titulo: "Cómo leer una radiografía articular: guía para propietarios",
    resumen: "Una introducción visual a los hallazgos radiográficos más comunes en articulaciones de carga.",
    formato: "video",
    fecha: "2026-08-18",
    imagen: "/images/articulo-radiografia.svg",
    contenido:
      "Este video explica, con ejemplos reales, qué buscan los veterinarios al evaluar una radiografía articular: espacio articular, densidad ósea y signos tempranos de osteoartritis.",
  },
  {
    slug: "caso-clinico-claudicacion-intermitente",
    titulo: "Caso clínico: claudicación intermitente en un caballo de polo",
    resumen: "Diagnóstico diferencial y plan de rehabilitación en un caso real de claudicación de esfuerzo.",
    formato: "caso-clinico",
    fecha: "2026-07-30",
    imagen: "/images/articulo-caso.svg",
    contenido:
      "Describimos el abordaje diagnóstico completo de un caballo de polo con claudicación intermitente de miembro posterior, desde el examen clínico hasta el plan de rehabilitación de 12 semanas.",
  },
];

export function getArticuloBySlug(slug: string) {
  return articulos.find((a) => a.slug === slug);
}

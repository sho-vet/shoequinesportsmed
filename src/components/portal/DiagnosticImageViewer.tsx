"use client";

import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import type { ImagenDiagnostica } from "@/types";

const tipoLabel: Record<string, string> = {
  radiografia: "Radiografía",
  ecografia: "Ecografía",
  endoscopia: "Endoscopia",
};

/** Simple zoom/pan viewer for radiographs, ultrasounds and endoscopy stills. */
export function DiagnosticImageViewer({ imagenes }: { imagenes: ImagenDiagnostica[] }) {
  const [activeId, setActiveId] = useState(imagenes[0]?.id);
  const [zoom, setZoom] = useState(1);
  const active = imagenes.find((img) => img.id === activeId);

  if (imagenes.length === 0) {
    return <p className="text-sm text-ink/60">Aún no hay imágenes diagnósticas registradas.</p>;
  }

  return (
    <div>
      <div className="relative h-80 w-full overflow-hidden rounded-card border border-line bg-ink sm:h-96">
        {active && (
          <div
            className="h-full w-full transition-transform"
            style={{ transform: `scale(${zoom})` }}
          >
            <Image
              src={active.url}
              alt={`${tipoLabel[active.tipo]} — ${active.descripcion || "sin descripción"}`}
              fill
              className="object-contain"
            />
          </div>
        )}

        <div className="absolute bottom-3 right-3 flex gap-2">
          <button
            type="button"
            aria-label="Acercar"
            onClick={() => setZoom((z) => Math.min(z + 0.25, 3))}
            className="rounded-card bg-white/90 p-2 text-navy hover:bg-white"
          >
            <ZoomIn size={18} />
          </button>
          <button
            type="button"
            aria-label="Alejar"
            onClick={() => setZoom((z) => Math.max(z - 0.25, 1))}
            className="rounded-card bg-white/90 p-2 text-navy hover:bg-white"
          >
            <ZoomOut size={18} />
          </button>
          <button
            type="button"
            aria-label="Restablecer zoom"
            onClick={() => setZoom(1)}
            className="rounded-card bg-white/90 p-2 text-navy hover:bg-white"
          >
            <RotateCcw size={18} />
          </button>
        </div>
      </div>

      <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
        {imagenes.map((img) => (
          <button
            key={img.id}
            type="button"
            onClick={() => {
              setActiveId(img.id);
              setZoom(1);
            }}
            className={`flex-shrink-0 rounded-card border px-3 py-2 text-left text-xs ${
              img.id === activeId ? "border-navy bg-navy-50" : "border-line bg-white"
            }`}
          >
            <p className="font-semibold text-navy">{tipoLabel[img.tipo]}</p>
            <p className="text-ink/60">{new Date(img.fecha).toLocaleDateString("es-CO")}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

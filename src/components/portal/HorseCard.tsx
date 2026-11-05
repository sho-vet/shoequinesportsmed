import Image from "next/image";
import Link from "next/link";
import type { Caballo } from "@/types";

export function HorseCard({ caballo }: { caballo: Caballo }) {
  return (
    <Link
      href={`/portal/caballos/${caballo.id}`}
      className="group flex items-center gap-4 rounded-card border border-line bg-white p-4 shadow-card transition-shadow hover:shadow-md"
    >
      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-navy-50">
        <Image
          src={caballo.foto_url || "/images/caballo-placeholder.svg"}
          alt={`Foto de ${caballo.nombre}`}
          fill
          className="object-cover"
        />
      </div>
      <div>
        <h3 className="font-semibold text-navy group-hover:underline">{caballo.nombre}</h3>
        <p className="text-sm text-ink/60">
          {caballo.disciplina || "Sin disciplina registrada"}
          {caballo.edad ? ` · ${caballo.edad} años` : ""}
        </p>
      </div>
    </Link>
  );
}

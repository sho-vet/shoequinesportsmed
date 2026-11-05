export type Disciplina =
  | "Salto"
  | "Doma Clásica"
  | "Polo"
  | "Carreras"
  | "Coleo"
  | "Otra";

export interface Caballo {
  id: string;
  owner_id: string;
  nombre: string;
  foto_url: string | null;
  edad: number | null;
  peso_kg: number | null;
  disciplina: Disciplina | null;
  created_at: string;
}

export type TipoAtencion = "consulta" | "vacunacion" | "procedimiento" | "seguimiento";

export interface RegistroClinico {
  id: string;
  caballo_id: string;
  tipo: TipoAtencion;
  titulo: string;
  descripcion: string | null;
  fecha: string;
  veterinario: string | null;
}

export type TipoImagenDiagnostica = "radiografia" | "ecografia" | "endoscopia";

export interface ImagenDiagnostica {
  id: string;
  caballo_id: string;
  tipo: TipoImagenDiagnostica;
  url: string;
  descripcion: string | null;
  fecha: string;
}

export interface MensajeChat {
  id: string;
  caballo_id: string;
  autor_id: string;
  autor_rol: "propietario" | "veterinario";
  contenido: string;
  created_at: string;
}

export interface ArticuloEducativo {
  slug: string;
  titulo: string;
  resumen: string;
  formato: "articulo" | "video" | "caso-clinico";
  fecha: string;
  imagen: string;
  contenido: string;
}

export type PaisPago = "CO" | "EC" | "PE" | "US";

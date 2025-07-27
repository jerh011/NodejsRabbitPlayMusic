// Album.dto.ts
export interface AlbumDTO {
  id: number;
  titulo: string;
  añoLanzamiento: number | null;
  portada: string | null;
  descripcion: string | null;
  sello: string | null;
  productor: string;
  artistaId: number;
}

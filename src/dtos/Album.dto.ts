import { ArtistaDTO } from './Artista.dto';
import { CancionesDTO } from './Canciones.dtos';
export interface AlbumDTO {
  id: number;
  titulo: string;
  artistaId: number;
  añoLanzamiento?: number | null;
  genero?: string;
  duracionTotal?: string;
  numeroTracks?: string;
  portada: string | null;
  descripcion: string | null;
  sello: string | null;
  productor: string;
  artista?: string;
  artistaCompleto?: ArtistaDTO | null;
  Canciones?: CancionesDTO[];
}

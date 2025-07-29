import { AlbumDTO } from './Album.dto';
import { ArtistaDTO } from './Artista.dto';
export interface CancionesDTO {
  id: number;
  titulo: string;
  albumId: number;
  artistaId: number;
  duracion: string;
  pista: number;
  letra: string;
  compositor: string;
  año: number;
  album?: string | AlbumDTO;
  artista?: string | ArtistaDTO;
  artistaCompleto?: ArtistaDTO;
  albumCompleto?: AlbumDTO;
}

import { ArtistaDTO } from './Artista.dto';
import { AlbumDTO } from './Album.dto';

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
  artista: string;
  album: string;
  artistaCompleto: ArtistaDTO;
  albumCompleto: AlbumDTO;
}

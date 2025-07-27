// AlbumConArtista.dto.ts
import { AlbumDTO } from './Album.dto';
import { ArtistaDTO } from './Artista.dto';

export interface AlbumConArtistaDTO extends AlbumDTO {
  artista: string; // nombre del artista
  genero: string;
  duracionTotal: string; // formato mm:ss
  numeroTracks: number;
  artistaCompleto: ArtistaDTO | null;
}

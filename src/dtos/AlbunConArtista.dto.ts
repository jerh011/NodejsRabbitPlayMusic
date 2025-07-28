// AlbumConArtista.dto.ts
import { AlbumDTO } from './Album.dto';
import { ArtistaDTO } from './Artista.dto';
import { CancionesDTO } from './Canciones.dtos';
export interface AlbumConArtistaDTO extends AlbumDTO {
  artista?: string;
  artistaCompleto: ArtistaDTO | null;
  Canciones?: CancionesDTO[];
}

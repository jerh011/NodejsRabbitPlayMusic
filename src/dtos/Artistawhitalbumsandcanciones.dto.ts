import { AlbumDTO } from './Album.dto';
import { ArtistaDTO } from './Artista.dto';
import { CancionesDTO } from './Canciones.dtos';
export interface ArtistawhitalbumsandcancionesDTO extends ArtistaDTO {
  albumes: AlbumDTO[];
  canciones: CancionesDTO[];
}

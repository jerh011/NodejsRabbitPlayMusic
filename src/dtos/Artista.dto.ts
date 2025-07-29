import { AlbumDTO } from './Album.dto';

import { CancionesDTO } from './Canciones.dtos';
export interface ArtistaDTO {
  id: number;
  nombre: string;
  nacionalidad: string;
  genero?: string;
  añoFormacion: number;
  biografia: string;
  imagen: string;
  albumes?: AlbumDTO[];
  canciones?: CancionesDTO[];
}

import { Injectable } from '@nestjs/common';
import { PrismaServices } from 'prisma/services/prisma.services';
import { AlbumConArtistaDTO } from '../../dtos/AlbunConArtista.dto';
import { CancionesDTO } from 'src/dtos/Canciones.dtos';
@Injectable()
export class AlbumesService {
  constructor(private readonly prisma: PrismaServices) {}

  async getAllAlbumes(): Promise<AlbumConArtistaDTO[]> {
    const albumes = await this.prisma.album.findMany({
      include: {
        artista: true,
        canciones: true,
      },
      orderBy: { id: 'asc' },
    });

    return albumes.map((album) => {
      const totalDuracionSegundos = album.canciones.reduce(
        (acc, c) => acc + c.duracion,
        0,
      );
      const minutos = Math.floor(totalDuracionSegundos / 60);
      const segundos = String(totalDuracionSegundos % 60).padStart(2, '0');

      return {
        id: album.id,
        titulo: album.titulo,
        artistaId: album.artistaId,
        añoLanzamiento: album.fechaLanzamiento?.getFullYear() || null,
        genero: album.artista.genero || '',
        duracionTotal: `${minutos}:${segundos}`,
        numeroTracks: album.canciones.length.toString(),
        portada: album.portada || null,
        descripcion: album.descripcion || null,
        sello: album.sello || null,
        productor: album.productor,
        artista: album.artista.nombre,
        artistaCompleto: {
          id: album.artista.id,
          nombre: album.artista.nombre,
          nacionalidad: album.artista.paisOrigen || '',
          genero: album.artista.genero,
          añoFormacion: album.artista.fechaNacimiento?.getFullYear() || 0,
          biografia: album.artista.biografia || '',
          imagen: album.artista.imagen || '',
        },
      };
    });
  }
  async getAlbumById(id: number): Promise<AlbumConArtistaDTO | null> {
    const album = await this.prisma.album.findUnique({
      where: { id },
      include: {
        artista: true,
        canciones: true,
      },
    });

    if (!album) return null;

    const totalDuracionSegundos = album.canciones.reduce(
      (sum, c) => sum + c.duracion,
      0,
    );
    const minutos = Math.floor(totalDuracionSegundos / 60);
    const segundos = String(totalDuracionSegundos % 60).padStart(2, '0');

    const canciones: CancionesDTO[] = album.canciones.map((cancion) => ({
      id: cancion.id,
      titulo: cancion.titulo,
      albumId: cancion.albumId,
      artistaId: album.artista.id,
      duracion: `${Math.floor(cancion.duracion / 60)}:${String(cancion.duracion % 60).padStart(2, '0')}`,
      pista: cancion.numeroTrack,
      letra: cancion.letra || '',
      compositor: cancion.compositor || '',
      año: album.fechaLanzamiento?.getFullYear() || 0,
    }));

    return {
      id: album.id,
      titulo: album.titulo,
      artistaId: album.artistaId,
      añoLanzamiento: album.fechaLanzamiento?.getFullYear() || null,
      genero: album.artista.genero,
      duracionTotal: `${minutos}:${segundos}`,
      numeroTracks: album.canciones.length.toString(),
      portada: album.portada || null,
      descripcion: album.descripcion || null,
      sello: album.sello || null,
      productor: album.productor,
      artista: album.artista.nombre,
      artistaCompleto: {
        id: album.artista.id,
        nombre: album.artista.nombre,
        nacionalidad: album.artista.paisOrigen || '',
        genero: album.artista.genero,
        añoFormacion: album.artista.fechaNacimiento?.getFullYear() || 0,
        biografia: album.artista.biografia || '',
        imagen: album.artista.imagen || '',
      },
      Canciones: canciones,
    };
  }
}

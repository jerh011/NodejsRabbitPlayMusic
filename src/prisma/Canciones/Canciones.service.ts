import { Injectable } from '@nestjs/common';
import { PrismaServices } from 'prisma/services/prisma.services';
import { CancionesDTO } from 'src/dtos/Canciones.dtos';
import { AlbumesService } from '../Albumes/Albumes.Service';
import { ArtistaService } from '../Artistas/Artistas.service';
@Injectable()
export class CancionesService {
  constructor(
    private prisma: PrismaServices,
    private albservice: AlbumesService,
    private artservice: ArtistaService,
  ) {}

  async GetAllCanciones(): Promise<CancionesDTO[]> {
    const canciones = await this.prisma.cancion.findMany({
      include: {
        album: {
          include: {
            artista: true,
            canciones: true, // 👈 necesario para calcular duración total y número de tracks
          },
        },
      },
    });

    return canciones.map((cancion) => {
      const totalSegundos = cancion.album.canciones.reduce(
        (acc, c) => acc + c.duracion,
        0,
      );
      const minutos = Math.floor(totalSegundos / 60);
      const segundos = String(totalSegundos % 60).padStart(2, '0');

      return {
        id: cancion.id,
        titulo: cancion.titulo,
        albumId: cancion.albumId,
        artistaId: cancion.album.artistaId,
        duracion: `${Math.floor(cancion.duracion / 60)}:${String(cancion.duracion % 60).padStart(2, '0')}`,
        pista: cancion.numeroTrack,
        letra: cancion.letra || '',
        compositor: cancion.compositor || '',
        año: cancion.album.fechaLanzamiento?.getFullYear() || 0,
        artista: cancion.album.artista.nombre,
        album: cancion.album.titulo,

        artistaCompleto: {
          id: cancion.album.artista.id,
          nombre: cancion.album.artista.nombre,
          nacionalidad: cancion.album.artista.paisOrigen || '',
          genero: cancion.album.artista.genero,
          añoFormacion:
            cancion.album.artista.fechaNacimiento?.getFullYear() || 0,
          biografia: cancion.album.artista.biografia || '',
          imagen: cancion.album.artista.imagen || '',
        },

        albumCompleto: {
          id: cancion.album.id,
          titulo: cancion.album.titulo,
          artistaId: cancion.album.artistaId,
          añoLanzamiento: cancion.album.fechaLanzamiento?.getFullYear() || null,
          genero: cancion.album.artista.genero,
          duracionTotal: `${minutos}:${segundos}`,
          numeroTracks: cancion.album.canciones.length.toString(),
          portada: cancion.album.portada || null,
          descripcion: cancion.album.descripcion || null,
          sello: cancion.album.sello || null,
          productor: cancion.album.productor,
        },
      };
    });
  }
  async getCancionPorId(id: number): Promise<CancionesDTO | null> {
    const cancion = await this.prisma.cancion.findUnique({
      where: { id },
      include: {
        album: {
          include: {
            artista: true,
            canciones: true, // ← incluir todas las canciones del álbum
          },
        },
      },
    });

    if (!cancion) return null;

    const artista = cancion.album.artista;
    const album = cancion.album;
    const cancionesAlbum = album.canciones;

    const duracionEnMinutos = Math.floor(cancion.duracion / 60);
    const duracionEnSegundos = String(cancion.duracion % 60).padStart(2, '0');
    const añoLanzamientoAlbum = album.fechaLanzamiento?.getFullYear() || 0;
    const añoFormacionArtista = artista.fechaNacimiento?.getFullYear() || 0;

    // Calcular duración total del álbum
    const duracionTotalSegundos = cancionesAlbum.reduce(
      (total, c) => total + c.duracion,
      0,
    );
    const totalMinutos = Math.floor(duracionTotalSegundos / 60);
    const totalSegundos = String(duracionTotalSegundos % 60).padStart(2, '0');
    const duracionTotal = `${totalMinutos}:${totalSegundos}`;

    const numeroTracks = cancionesAlbum.length.toString();

    return {
      id: cancion.id,
      titulo: cancion.titulo,
      albumId: cancion.albumId,
      artistaId: artista.id,
      duracion: `${duracionEnMinutos}:${duracionEnSegundos}`,
      pista: cancion.numeroTrack,
      letra: cancion.letra || '',
      compositor: cancion.compositor || '',
      año: añoLanzamientoAlbum,
      artista: {
        id: artista.id,
        nombre: artista.nombre,
        nacionalidad: artista.paisOrigen || '',
        genero: artista.genero,
        añoFormacion: añoFormacionArtista,
        biografia: artista.biografia || '',
        imagen: artista.imagen || '',
      },
      album: {
        id: album.id,
        titulo: album.titulo,
        artistaId: album.artistaId,
        añoLanzamiento: añoLanzamientoAlbum || null,
        genero: artista.genero,
        duracionTotal: duracionTotal,
        numeroTracks: numeroTracks,
        portada: album.portada,
        descripcion: album.descripcion,
        sello: album.sello,
        productor: album.productor,
      },
    };
  }

  async buscarCancionesnombre(termino: string): Promise<CancionesDTO[]> {
    const canciones = await this.prisma.cancion.findMany({
      where: {
        OR: [
          {
            titulo: {
              contains: termino,
              mode: 'insensitive',
            },
          },
          {
            letra: {
              contains: termino,
              mode: 'insensitive',
            },
          },
          {
            album: {
              artista: {
                nombre: {
                  contains: termino,
                  mode: 'insensitive',
                },
              },
            },
          },
        ],
      },
      include: {
        album: {
          include: {
            artista: true,
          },
        },
      },
    });
    return canciones.map((c) => ({
      id: c.id,
      titulo: c.titulo,
      albumId: c.albumId,
      artistaId: c.album.artista.id,
      duracion: `${Math.floor(c.duracion / 60)}:${String(c.duracion % 60).padStart(2, '0')}`,
      pista: c.numeroTrack,
      letra: c.letra || '',
      compositor: c.compositor || '',
      año: c.album.fechaLanzamiento?.getFullYear() || 0,
      album: c.album.titulo,
      artista: c.album.artista.nombre,
    }));
  }
  async buscar(termino: string): Promise<any> {
    const artistas = await this.artservice.buscarArtistanombre(termino);
    const abumes = await this.albservice.buscarAlbumeasNombre(termino);
    const canciones = await this.buscarCancionesnombre(termino);

    return {
      artistas: artistas ? artistas : [],
      albumes: abumes ? abumes : [],
      canciones: canciones ? canciones : [],
    };
  }
}

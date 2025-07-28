import { Injectable } from '@nestjs/common';
import { PrismaServices } from 'prisma/services/prisma.services';
import { ArtistaDTO } from '../../dtos/Artista.dto';
import { ArtistawhitalbumsandcancionesDTO } from 'src/dtos/Artistawhitalbumsandcanciones.dto';
@Injectable()
export class ArtistaService {
  constructor(private prisma: PrismaServices) {}

  async getAllArtistas(): Promise<ArtistaDTO[]> {
    const artistas = await this.prisma.artista.findMany({
      orderBy: { id: 'asc' },
    });

    return artistas.map((artista) => ({
      id: artista.id,
      nombre: artista.nombre,
      nacionalidad: artista.paisOrigen || '',
      genero: artista.genero,
      añoFormacion: artista.fechaNacimiento?.getFullYear() || 0,
      biografia: artista.biografia || '',
      imagen: artista.imagen || '',
    }));
  }

  async getArtistaById(
    id: number,
  ): Promise<ArtistawhitalbumsandcancionesDTO | null> {
    const artista = await this.prisma.artista.findUnique({
      where: { id },
      include: {
        albumes: {
          include: {
            canciones: true,
          },
        },
      },
    });

    if (!artista) return null;

    const canciones = artista.albumes.flatMap((album) =>
      album.canciones.map((cancion) => ({
        id: cancion.id,
        titulo: cancion.titulo,
        albumId: cancion.albumId,
        artistaId: artista.id,
        duracion: `${Math.floor(cancion.duracion / 60)}:${String(cancion.duracion % 60).padStart(2, '0')}`,
        pista: cancion.numeroTrack,
        letra: cancion.letra || '',
        compositor: cancion.compositor || '',
        año: album.fechaLanzamiento?.getFullYear() || 0,
      })),
    );

    const albumes = artista.albumes.map((album) => {
      const totalDuracionSegundos = album.canciones.reduce(
        (sum, c) => sum + c.duracion,
        0,
      );
      const minutos = Math.floor(totalDuracionSegundos / 60);
      const segundos = String(totalDuracionSegundos % 60).padStart(2, '0');

      return {
        id: album.id,
        titulo: album.titulo,
        artistaId: album.artistaId,
        añoLanzamiento: album.fechaLanzamiento?.getFullYear() || null,
        genero: artista.genero || '',
        duracionTotal: `${minutos}:${segundos}`,
        numeroTracks: album.canciones.length.toString(),
        portada: album.portada || null,
        descripcion: album.descripcion || null,
        sello: album.sello || null,
        productor: album.productor,
      };
    });

    return {
      id: artista.id,
      nombre: artista.nombre,
      nacionalidad: artista.paisOrigen || '',
      genero: artista.genero || '',
      añoFormacion: artista.fechaNacimiento?.getFullYear() || 0,
      biografia: artista.biografia || '',
      imagen: artista.imagen || '',
      albumes,
      canciones,
    };
  }
}

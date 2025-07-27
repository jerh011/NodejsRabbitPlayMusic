import { Injectable } from '@nestjs/common';
import { PrismaServices } from 'prisma/services/prisma.services';
import { AlbumConArtistaDTO } from '../../dtos/AlbunConArtista.dto';
import { ArtistaService } from '../Artistas/Artistas.service';

@Injectable()
export class AlbumesService {
  constructor(
    private prisma: PrismaServices,
    private artistaService: ArtistaService,
  ) {}

  async getAllAlbumes(): Promise<AlbumConArtistaDTO[]> {
    const albumes = await this.prisma.album.findMany({
      orderBy: {
        id: 'asc',
      },
    });

    const resultado = await Promise.all(
      albumes.map(async (album) => {
        const artista = await this.artistaService.getArtistaById(
          album.artistaId,
        );

        const [stats] = await this.prisma.$queryRawUnsafe<any[]>(`
          SELECT 
            SUM(CAST(can.duracion AS INTEGER)) AS "duracionTotalAlbum",
            COUNT(can.id) AS "numeroTracks"
          FROM canciones AS can
          WHERE can.albumid = ${album.id}
          GROUP BY can.albumid;
        `);

        // Manejo seguro de BigInt y valores nulos
        const duracionSegundos = stats?.duracionTotalAlbum
          ? Number(stats.duracionTotalAlbum)
          : 0;

        const minutos = Math.floor(duracionSegundos / 60);
        const segundos = duracionSegundos % 60;
        const duracionTotal = `${minutos}:${segundos.toString().padStart(2, '0')}`;

        return {
          id: album.id,
          titulo: album.titulo,
          artistaId: album.artistaId,
          añoLanzamiento: album.fechaLanzamiento?.getFullYear() ?? null,
          genero: artista?.genero || '',
          duracionTotal,
          numeroTracks: stats?.numeroTracks ? Number(stats.numeroTracks) : 0,
          portada: album.portada,
          descripcion: album.descripcion,
          sello: album.sello,
          productor: album.productor,
          artista: artista?.nombre || 'Desconocido',
          artistaCompleto: artista,
        };
      }),
    );

    return resultado;
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaServices } from 'prisma/services/prisma.services';

@Injectable()
export class CancionesService {
  constructor(private prisma: PrismaServices) {}

  async getAllCanciones(): Promise<any[]> {
    const cancionesRaw = await this.prisma.$queryRawUnsafe<any[]>(`
      SELECT 
        can.id,
        can.titulo,
        can.albumid,
        can.duracion,
        can.numerotrack AS pista,
        can.letra,
        can.compositor,
        EXTRACT(YEAR FROM can.actualizadoEn) AS año,

        art.id AS artistaId,
        art.nombre AS nombre,
        art.paisorigen AS nacionalidad,
        art.genero,
        EXTRACT(YEAR FROM art.creadoen) AS añoFormacion,
        art.biografia,
        art.imagen,

        alb.id AS albumId,
        alb.titulo AS albumTitulo,
        alb.portada,

        (
          SELECT SUM(CAST(can2.duracion AS INTEGER))
          FROM canciones AS can2 
          WHERE can2.albumid = alb.id
        ) AS duracionTotalAlbum,

        (
          SELECT COUNT(*)
          FROM canciones AS can3 
          WHERE can3.albumid = alb.id
        ) AS numeroTracks,

        alb.descripcion,
        alb.sello,
        alb.productor,
        EXTRACT(YEAR FROM alb.fechalanzamiento) AS añoLanzamiento

      FROM canciones AS can
      INNER JOIN albumes AS alb ON can.albumid = alb.id
      INNER JOIN artistas AS art ON alb.artistaid = art.id;
    `);

    return cancionesRaw.map((cancion) => {
      const duracionEnSegundos = parseInt(cancion.duracion, 10);
      const minutos = Math.floor(duracionEnSegundos / 60);
      const segundos = duracionEnSegundos % 60;
      const duracionFormateada = `${minutos}:${segundos.toString().padStart(2, '0')}`;

      return {
        id: cancion.id,
        titulo: cancion.titulo,
        albumid: cancion.albumid,
        duracion: duracionFormateada,
        pista: cancion.pista,
        letra: cancion.letra,
        compositor: cancion.compositor,
        año: parseInt(cancion.año, 10),

        artistaCompleto: {
          id: cancion.artistaid,
          nombre: cancion.nombre,
          nacionalidad: cancion.nacionalidad,
          genero: cancion.genero,
          añoFormacion: parseInt(cancion.añoformacion, 10),
          biografia: cancion.biografia,
          imagen: cancion.imagen,
        },

        albumCompleto: {
          id: cancion.albumid,
          titulo: cancion.albumTitulo,
          artistaId: cancion.artistaid,
          añoLanzamiento: parseInt(cancion.añoLanzamiento, 10),
          genero: cancion.genero,
          duracionTotal: cancion.duracionTotalAlbum,
          numeroTracks: cancion.numeroTracks,
          portada: cancion.portada,
          descripcion: cancion.descripcion,
          sello: cancion.sello,
          productor: cancion.productor,
        },
      };
    });
  }
}

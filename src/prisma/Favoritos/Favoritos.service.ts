import { Injectable } from '@nestjs/common';
import { promises } from 'dns';
import { PrismaServices } from 'prisma/services/prisma.services';
import { Favoritos } from '@prisma/client';
@Injectable()
export class FavoritosService {
  constructor(private prisma: PrismaServices) {}

  async getAllFavortios(): Promise<any[]> {
    const favoritos = await this.prisma.favoritos.findMany({
      orderBy: {
        id: 'asc',
      },
      include: {
        cancion: {
          include: {
            album: true,
          },
        },
      },
    });

    return favoritos.map((fav) => ({
      id: fav.id,
      cancionId: fav.cancionId,
      titulo: fav.cancion.titulo,
      duracion: `${Math.floor(fav.cancion.duracion / 60)}:${String(fav.cancion.duracion % 60).padStart(2, '0')}`,
      año: fav.cancion.album?.fechaLanzamiento?.getFullYear() || 'Desconocido',
    }));
  }

  async createFavoritos(
    data: Omit<Favoritos, 'id' | 'creadoEn'>,
  ): Promise<Favoritos> {
    return this.prisma.favoritos.create({
      data: {
        cancionId: data.cancionId,
      },
    });
  }

  async DeleteFavoritosByID(id: number): Promise<any> {
    const favorito = await this.prisma.favoritos.findFirst({
      where: {
        cancionId: id, // si cancionId es único
      },
    });

    if (!favorito) {
      throw new Error(`No se encontró el favorito con cancionId ${id}`);
    }

    return this.prisma.favoritos.delete({
      where: {
        id: favorito.id,
      },
    });
  }
  // async getFavoritos(id: number): Promise<any | null> {
  //   return this.prisma.favoritos.findUnique({
  //     where: {
  //       id,
  //     },
  //   });
  // }

  // async CreateFavoritos(data: Omit<any, 'id'>): Promise<any> {
  //   return this.prisma.favoritos.create({
  //     data: {
  //       title: data.title,
  //       descripcion: data.descripcion,
  //     },
  //   });
  // }
  // async DeleteTaskByID(id: number): Promise<any> {
  //   return this.prisma.favoritos.delete({ where: { id } });
  // }
}

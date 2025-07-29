import { Injectable } from '@nestjs/common';
import { PrismaServices } from 'prisma/services/prisma.services';

@Injectable()
export class FavoritosService {
  constructor(private prisma: PrismaServices) {}

  async getAllFavortios(): Promise<any[]> {
    return this.prisma.favoritos.findMany({
      orderBy: {
        id: 'asc', // También puedes usar 'title': 'asc' si deseas ordenar por título
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

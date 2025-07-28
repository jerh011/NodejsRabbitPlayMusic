import { Injectable } from '@nestjs/common';
import { PrismaServices } from 'prisma/services/prisma.services';

@Injectable()
export class GenerosService {
  constructor(private prisma: PrismaServices) {}

  async getAllGeneros(): Promise<string[]> {
    const generos = await this.prisma.artista.groupBy({
      by: ['genero'],
    });

    return generos.map((g) => g.genero);
  }
}

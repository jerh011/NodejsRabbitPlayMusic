import { Injectable } from '@nestjs/common';
import { PrismaServices } from 'prisma/services/prisma.services';
import { ArtistaDTO } from '../../dtos/Artista.dto';

@Injectable()
export class ArtistaService {
  constructor(private prisma: PrismaServices) {}

  async getAllArtistas(): Promise<ArtistaDTO[]> {
    const artistas = await this.prisma.artista.findMany({
      orderBy: {
        id: 'asc',
      },
    });

    return artistas.map((artista) => {
      return {
        id: artista.id,
        nombre: artista.nombre,
        nacionalidad: artista.paisOrigen || '',
        genero: artista.genero,
        añoFormacion: artista.creadoEn.getFullYear(),
        biografia: artista.biografia || '',
        imagen: artista.imagen || '',
      };
    });
  }
  async getArtistaById(id: number): Promise<ArtistaDTO | null> {
    const artista = await this.prisma.artista.findUnique({
      where: { id },
    });

    if (!artista) return null;

    return {
      id: artista.id,
      nombre: artista.nombre,
      nacionalidad: artista.paisOrigen || '',
      genero: artista.genero,
      añoFormacion: artista.creadoEn.getFullYear(),
      biografia: artista.biografia || '',
      imagen: artista.imagen || '',
    };
  }
}

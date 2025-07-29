import {
  Controller,
  Get,
  Param,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { ArtistaService } from './Artistas.service';
//import { Artista } from '@prisma/client'; // ✅ Corrección aquí
import { ArtistaDTO } from '../../dtos/Artista.dto';

@Controller('artistas')
export class ArtistasController {
  constructor(private readonly artistaservice: ArtistaService) {}
  @Get()
  async getAllartistas(): Promise<ArtistaDTO[]> {
    return this.artistaservice.getAllArtistas();
  }

  // @Get('buscar')
  // async buscarArtistas(@Query('q') termino: string): Promise<any[]> {
  //   if (!termino || termino.trim() === '') {
  //     return [];
  //   }
  //   return this.artistaservice.buscarArtistanombre(termino);
  // }

  @Get('/:id')
  async getTaskById(@Param('id') id: string): Promise<any | null> {
    return this.artistaservice.getArtistaById(Number(id));
  }
}

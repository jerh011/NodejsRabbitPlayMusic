import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
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
  @Get('/:id')
  async getTaskById(@Param('id') id: string): Promise<any | null> {
    return this.artistaservice.getArtistaById(Number(id));
  }
}

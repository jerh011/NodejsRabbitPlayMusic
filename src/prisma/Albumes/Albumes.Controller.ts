import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { AlbumesService } from './Albumes.Service';
//import { Artista } from '@prisma/client'; // ✅ Corrección aquí
import { ArtistaDTO } from '../../dtos/Artista.dto';

@Controller('albumes')
export class ArtistasController {
  constructor(private readonly albumesservice: AlbumesService) {}
  @Get()
  async getAllartistas(): Promise<any[]> {
    return this.albumesservice.getAllAlbumes();
  }

  @Get('/:id')
  async getAllartistasbyId(@Param('id') id: string): Promise<any> {
    return this.albumesservice.getAlbumById(Number(id));
  }
}

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { AlbumesService } from './Albumes.Service';
import { AlbumDTO } from 'src/dtos/Album.dto';

@Controller('albumes')
export class ArtistasController {
  constructor(private readonly albumesservice: AlbumesService) {}
  @Get()
  async getAllartistas(): Promise<AlbumDTO[]> {
    return this.albumesservice.getAllAlbumes();
  }

  @Get('buscar')
  async buscaralbumestas(@Query('q') termino: string): Promise<any[]> {
    if (!termino || termino.trim() === '') {
      return [];
    }
    return this.albumesservice.buscarAlbumeasNombre(termino);
  }

  @Get('/:id')
  async getAllalbumesbyId(@Param('id') id: string): Promise<AlbumDTO | null> {
    return this.albumesservice.getAlbumById(Number(id));
  }
}

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { FavoritosService } from './Favoritos.service';
import { Favoritos } from '@prisma/client';
@Controller('favoritos')
export class FavoritosContoller {
  constructor(private readonly favoritosservices: FavoritosService) {}
  @Get()
  async getAllFavoritos(): Promise<any[]> {
    return this.favoritosservices.getAllFavortios();
  }
  @Post()
  async createFavoritos(@Body() data: Favoritos): Promise<any> {
    return this.favoritosservices.createFavoritos(data);
  }
  @Delete(':id')
  async DeleteTask(@Param('id') id: string): Promise<any> {
    return this.favoritosservices.DeleteFavoritosByID(Number(id));
  }
}

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
import { Tareas } from '@prisma/client'; // ✅ Corrección aquí

@Controller('favoritos')
export class FavoritosContoller {
  constructor(private readonly favoritosservices: FavoritosService) {}
  @Get()
  async getAllFavoritos(): Promise<any[]> {
    return this.favoritosservices.getAllFavortios();
  }

  // @Post()
  // async createFavoritos(@Body() data: any): Promise<any> {
  //   return this.favoritosservices.CreateFavoritos(data);
  // }

  //@Get('/obtener/:id')
  // @Get('/:id')
  // async getTaskById(@Param('id') id: string): Promise<Tareas | null> {
  //   return this.favoritosservices.getFavoritos(Number(id));
  // }

  // @Delete(':id')
  // async DeleteFavoritos(@Param('id') id: string): Promise<Tareas> {
  //   return this.favoritosservices.DeleteTaskByID(Number(id));
  // }
}

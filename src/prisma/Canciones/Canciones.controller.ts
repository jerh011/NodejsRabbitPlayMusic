import {
  Controller,
  Get,
  Param,
  Query,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CancionesService } from './Canciones.service';
import { CancionesDTO } from 'src/dtos/Canciones.dtos';

@Controller('canciones')
export class CancionesController {
  constructor(private readonly cancionesservices: CancionesService) {}
  @Get()
  async getAllCanciones(): Promise<CancionesDTO[]> {
    return this.cancionesservices.GetAllCanciones();
  }

  @Get('buscar')
  async buscarCanciones(@Query('q') termino: string): Promise<any> {
    if (!termino || termino.trim() === '') {
      return [];
    }
    return this.cancionesservices.buscar(termino.trim());
  }

  @Get(':id')
  async getCancionById(@Param('id') id: string): Promise<CancionesDTO> {
    const parsedId = Number(id);
    if (!Number.isInteger(parsedId)) {
      throw new BadRequestException('ID debe ser un número entero');
    }

    const cancion = await this.cancionesservices.getCancionPorId(parsedId);
    if (!cancion) {
      throw new NotFoundException('Canción no encontrada');
    }

    return cancion;
  }
}

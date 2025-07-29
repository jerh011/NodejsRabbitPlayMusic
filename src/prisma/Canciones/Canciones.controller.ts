import {
  Controller,
  Get,
  Param,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { CancionesService } from './Canciones.service';
import { CancionesDTO } from 'src/dtos/Canciones.dtos';

@Controller('canciones')
export class CancionesController {
  constructor(private readonly cancionesservices: CancionesService) {}

  /**
   * Obtener todas las canciones
   */
  @Get()
  async getAllCanciones(): Promise<CancionesDTO[]> {
    return this.cancionesservices.GetAllCanciones();
  }

  @Get('buscar')
  async buscarCanciones(@Query('q') termino: string): Promise<any[]> {
    if (!termino || termino.trim() === '') {
      return [];
    }
    return this.cancionesservices.buscar(termino);
  }

  @Get(':id')
  async getCancionById(@Param('id') id: string): Promise<CancionesDTO> {
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
      throw new NotFoundException('ID inválido');
    }

    const cancion = await this.cancionesservices.getCancionPorId(parsedId);
    if (!cancion) {
      throw new NotFoundException('Canción no encontrada');
    }

    return cancion;
  }
}

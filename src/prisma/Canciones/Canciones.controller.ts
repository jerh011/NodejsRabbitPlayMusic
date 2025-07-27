import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CancionesService } from './Canciones.service';
// import { Tarea } from '@prisma/client'; // ✅ Corrección aquí
import { CancionesDTO } from '../../dtos/Canciones.dtos';
@Controller('Canciones')
export class CancionesController {
  constructor(private readonly cancionesservices: CancionesService) {}
  @Get()
  async GetAllCanciones(): Promise<CancionesDTO[]> {
    return this.cancionesservices.getAllCanciones();
  }
}

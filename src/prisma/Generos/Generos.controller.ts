import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { GenerosService } from './Generos.service';

@Controller('generos')
export class GenerosContoller {
  constructor(private readonly Generosservice: GenerosService) {}
  @Get()
  async getAllTask(): Promise<string[]> {
    return this.Generosservice.getAllGeneros();
  }
}

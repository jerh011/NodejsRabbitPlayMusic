import { Module } from '@nestjs/common';
import { Prismamodule } from 'prisma/services/prisma.module';
import { CancionesController } from './Canciones.controller';
import { CancionesService } from './Canciones.service';
import { AlbumesModule } from '../Albumes/Albumes.module';
import { ArtistaModule } from '../Artistas/Artistas.module';
@Module({
  controllers: [CancionesController],
  providers: [CancionesService],
  exports: [CancionesService],
  imports: [Prismamodule, AlbumesModule, ArtistaModule], //importamos el prisma module que  asu ves dejara conctarse a la base de deatos
})
export class CancionesModule {}

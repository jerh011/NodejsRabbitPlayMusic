import { Module } from '@nestjs/common';
import { ArtistasController } from './Albumes.Controller';
import { AlbumesService } from './Albumes.Service';
import { Prismamodule } from 'prisma/services/prisma.module';
import { ArtistaModule } from '../Artistas/Artistas.module';
@Module({
  controllers: [ArtistasController],
  providers: [AlbumesService],
  //importar mas adelante los servicios de artistas
  imports: [Prismamodule, ArtistaModule], //importamos el prisma module que  asu ves dejara conctarse a la base de deatos
})
export class AlbumesModule {}

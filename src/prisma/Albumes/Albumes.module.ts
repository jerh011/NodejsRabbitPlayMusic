import { Module } from '@nestjs/common';
import { ArtistasController } from './Albumes.Controller';
import { AlbumesService } from './Albumes.Service';
import { Prismamodule } from 'prisma/services/prisma.module';
@Module({
  controllers: [ArtistasController],
  providers: [AlbumesService],
  exports: [AlbumesService],
  imports: [Prismamodule], //importamos el prisma module que  asu ves dejara conctarse a la base de deatos
})
export class AlbumesModule {}

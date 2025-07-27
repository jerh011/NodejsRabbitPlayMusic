import { Module } from '@nestjs/common';
import { ArtistasController } from './Artistas.Controller';
import { ArtistaService } from './Artistas.service';
import { Prismamodule } from 'prisma/services/prisma.module';

@Module({
  controllers: [ArtistasController],
  providers: [ArtistaService],
  exports: [ArtistaService], //que no se te olvideeeeeeeeeeeeeeeeeeeeeeeee!!!!
  imports: [Prismamodule], //importamos el prisma module que  asu ves dejara conctarse a la base de deatos
})
export class ArtistaModule {}

import { Module } from '@nestjs/common';
import { ArtistasController } from './Artistas.Controller';
import { ArtistaService } from './Artistas.service';
import { Prismamodule } from 'prisma/services/prisma.module';

@Module({
  controllers: [ArtistasController],
  providers: [ArtistaService],
  exports: [ArtistaService], //que no se te olvideeeeeeeeeeeeeeeeeeeeeeeee!!!!
  imports: [Prismamodule], // si hay circularidad
})
export class ArtistaModule {}

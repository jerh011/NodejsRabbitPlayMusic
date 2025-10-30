import { Module } from '@nestjs/common';

import { CancionesModule } from './prisma/Canciones/Canciones.module';
import { ArtistaModule } from './prisma/Artistas/Artistas.module';
import { AlbumesModule } from './prisma/Albumes/Albumes.module';
import { GenerosModule } from './prisma/Generos/Generos.module';
@Module({
  imports: [CancionesModule, ArtistaModule, AlbumesModule, GenerosModule],
})
export class AppModule {}

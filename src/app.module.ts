import { Module } from '@nestjs/common';
import { TaskModule } from './prisma/Task/Task.module';
import { CancionesModule } from './prisma/Canciones/Canciones.module';
import { ArtistaModule } from './prisma/Artistas/Artistas.module';
import { AlbumesModule } from './prisma/Albumes/Albumes.module';
import { GenerosModule } from './prisma/Generos/Generos.module';
import { FavoritosModule } from './prisma/Favoritos/Favoritos.module';
@Module({
  imports: [
    TaskModule,
    CancionesModule,
    ArtistaModule,
    AlbumesModule,
    GenerosModule,
    FavoritosModule,
  ],
})
export class AppModule {}

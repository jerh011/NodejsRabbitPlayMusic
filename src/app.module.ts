import { Module } from '@nestjs/common';
import { TaskModule } from './prisma/Task/Task.module';
import { CancionesModule } from './prisma/Canciones/Canciones.module';
import { ArtistaModule } from './prisma/Artistas/Artistas.module';
import { AlbumesModule } from './prisma/Albumes/Albumes.module';
@Module({
  imports: [TaskModule, CancionesModule, ArtistaModule, AlbumesModule],
})
export class AppModule {}

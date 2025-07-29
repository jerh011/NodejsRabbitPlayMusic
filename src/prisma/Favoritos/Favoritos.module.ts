import { Module } from '@nestjs/common';
import { FavoritosContoller } from './Favoritos.controller';
import { FavoritosService } from './Favoritos.service';
import { Prismamodule } from 'prisma/services/prisma.module';

@Module({
  controllers: [FavoritosContoller],
  providers: [FavoritosService],
  imports: [Prismamodule], //importamos el prisma module que  asu ves dejara conctarse a la base de deatos
})
export class FavoritosModule {}

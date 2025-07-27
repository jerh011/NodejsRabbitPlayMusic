import { Module } from '@nestjs/common';
import { Prismamodule } from 'prisma/services/prisma.module';
import { CancionesController } from './Canciones.controller';
import { CancionesService } from './Canciones.service';
@Module({
  controllers: [CancionesController],
  providers: [CancionesService],
  imports: [Prismamodule], //importamos el prisma module que  asu ves dejara conctarse a la base de deatos
})
export class CancionesModule {}

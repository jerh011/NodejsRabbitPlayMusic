import { Module } from '@nestjs/common';
import { GenerosContoller } from './Generos.controller';
import { GenerosService } from './Generos.service';
import { Prismamodule } from 'prisma/services/prisma.module';

@Module({
  controllers: [GenerosContoller],
  providers: [GenerosService],
  imports: [Prismamodule], //importamos el prisma module que  asu ves dejara conctarse a la base de deatos
})
export class GenerosModule {}

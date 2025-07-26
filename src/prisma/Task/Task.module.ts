import { Module } from '@nestjs/common';
import { TaskContoller } from './Task.controller';
import { TaskService } from './Task.service';
import { Prismamodule } from 'prisma/services/prisma.module';

@Module({
  controllers: [TaskContoller],
  providers: [TaskService],
  imports: [Prismamodule], //importamos el prisma module que  asu ves dejara conctarse a la base de deatos
})
export class TaskModule {}

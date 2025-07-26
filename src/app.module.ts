import { Module } from '@nestjs/common';
import { TaskModule } from './prisma/Task/Task.module';

@Module({
  imports: [TaskModule],
})
export class AppModule {}

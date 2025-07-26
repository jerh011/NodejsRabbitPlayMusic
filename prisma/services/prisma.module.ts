import { Module } from '@nestjs/common';
import { PrismaServices } from './prisma.services';

@Module({
  providers: [PrismaServices],
  exports: [PrismaServices],
})
export class Prismamodule {}

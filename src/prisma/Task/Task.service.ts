import { Injectable } from '@nestjs/common';
import { PrismaServices } from 'prisma/services/prisma.services';
import { Tarea } from '@prisma/client';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaServices) {}

  async getAllTask(): Promise<Tarea[]> {
    return this.prisma.tarea.findMany({
      orderBy: {
        id: 'asc', // También puedes usar 'title': 'asc' si deseas ordenar por título
      },
    });
  }

  async getTaskById(id: number): Promise<Tarea | null> {
    return this.prisma.tarea.findUnique({
      where: {
        id,
      },
    });
  }

  async CreateTask(data: Omit<Tarea, 'id'>): Promise<Tarea> {
    return this.prisma.tarea.create({
      data: {
        title: data.title,
        descripcion: data.descripcion,
      },
    });
  }

  async UpdateTaskById(data: Tarea, id: number): Promise<Tarea> {
    return this.prisma.tarea.update({
      where: {
        id,
      },
      data: {
        title: data.title,
        descripcion: data.descripcion,
      },
    });
  }

  async DeleteTaskByID(id: number): Promise<Tarea> {
    return this.prisma.tarea.delete({ where: { id } });
  }
}

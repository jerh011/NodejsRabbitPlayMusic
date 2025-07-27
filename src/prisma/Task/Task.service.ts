import { Injectable } from '@nestjs/common';
import { PrismaServices } from 'prisma/services/prisma.services';
import { Tareas } from '@prisma/client';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaServices) {}

  async getAllTask(): Promise<Tareas[]> {
    return this.prisma.tareas.findMany({
      orderBy: {
        id: 'asc', // También puedes usar 'title': 'asc' si deseas ordenar por título
      },
    });
  }

  async getTaskById(id: number): Promise<Tareas | null> {
    return this.prisma.tareas.findUnique({
      where: {
        id,
      },
    });
  }

  async CreateTask(data: Omit<Tareas, 'id'>): Promise<Tareas> {
    return this.prisma.tareas.create({
      data: {
        title: data.title,
        descripcion: data.descripcion,
      },
    });
  }

  async UpdateTaskById(data: Tareas, id: number): Promise<Tareas> {
    return this.prisma.tareas.update({
      where: {
        id,
      },
      data: {
        title: data.title,
        descripcion: data.descripcion,
      },
    });
  }

  async DeleteTaskByID(id: number): Promise<Tareas> {
    return this.prisma.tareas.delete({ where: { id } });
  }
}

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { TaskService } from './Task.service';
import { Tareas } from '@prisma/client'; // ✅ Corrección aquí

@Controller('tareas')
export class TaskContoller {
  constructor(private readonly tasksevice: TaskService) {}
  @Get()
  async getAllTask(): Promise<Tareas[]> {
    return this.tasksevice.getAllTask();
  }

  @Post()
  async createTask(@Body() data: Tareas): Promise<Tareas> {
    return this.tasksevice.CreateTask(data);
  }

  //   @Get('/obtener/:id')
  @Get('/:id')
  async getTaskById(@Param('id') id: string): Promise<Tareas | null> {
    return this.tasksevice.getTaskById(Number(id));
  }

  @Delete(':id')
  async DeleteTask(@Param('id') id: string): Promise<Tareas> {
    return this.tasksevice.DeleteTaskByID(Number(id));
  }

  @Put(':id')
  async UpdateTaskById(
    @Param('id') id: string,
    @Body() data: Tareas,
  ): Promise<Tareas> {
    return this.tasksevice.UpdateTaskById(data, Number(id));
  }
}

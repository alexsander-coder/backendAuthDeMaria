import { Controller, Post, Get, Param, Body, Delete, Patch, UseGuards, Query, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TasksService } from './tasks.service';
import { Task } from './tasks.entity';
import { UnauthorizedException } from '@nestjs/common';


@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Post()
  create(@Body('description') description: string, @Body('userId') userId: number): Promise<Task> {
    return this.tasksService.create(description, userId);
  }

  @Get(':userId')
  findAll(@Param('userId') userId: number): Promise<Task[]> {
    return this.tasksService.findAll(userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body('description') description: string,
    @Body('status') status: string
  ): Promise<Task> {
    return this.tasksService.update(id, description, status);
  }

  @Delete(':id')
  async delete(
    @Param('id') id: number,
    @Body('userId') userId: number
  ): Promise<void> {
    const task = await this.tasksService.findById(id);

    if (!task) {
      throw new Error('Tarefa não encontrada');
    }

    if (task.userId !== userId) {
      throw new UnauthorizedException('Você não tem permissão para excluir esta tarefa');
    }

    return this.tasksService.delete(id);
  }


  @Patch('toggle/:id')
  async toggleCompletion(@Param('id') id: number): Promise<Task> {
    return this.tasksService.toggleCompletion(id);
  }


  @Get()
  async getTasks(@Query('status') status: string, @Request() req): Promise<Task[]> {
    const userId = req.user.userId;

    return this.tasksService.findTasks(userId, status);
  }


}

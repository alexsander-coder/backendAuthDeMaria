import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './tasks.entity';
import { User } from '../users/users.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) { }

  async create(description: string, userId: number): Promise<Task> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const task = new Task();
    task.description = description;
    task.user = user;
    task.status = 'pendente';
    task.completed = false;

    return this.tasksRepository.save(task);
  }

  async findAll(userId: number): Promise<Task[]> {
    return this.tasksRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }

  async update(id: number, description: string, status: string): Promise<Task> {
    const task = await this.tasksRepository.findOne({ where: { id } });
    if (task) {
      task.description = description;
      task.status = status;
      return this.tasksRepository.save(task);
    }
    throw new Error('Tarefa não encontrada');
  }

  async findById(id: number): Promise<Task | null> {
    return this.tasksRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    const task = await this.tasksRepository.findOne({ where: { id } });

    if (task) {
      await this.tasksRepository.remove(task);
    } else {
      throw new Error('Tarefa não encontrada');
    }
  }

  async toggleCompletion(id: number): Promise<Task> {
    const task = await this.tasksRepository.findOne({ where: { id } });

    if (!task) {
      throw new Error('Tarefa não encontrada');
    }

    task.completed = !task.completed;
    task.status = task.completed ? 'concluída' : 'pendente';

    await this.tasksRepository.save(task);

    return task;
  }


  async findTasks(userId: number, status: string | undefined): Promise<Task[]> {
    const whereClause: any = { userId };

    if (status && status !== 'todos') {
      whereClause.status = status === 'pendente' ? 'pendente' : 'concluída';
    }

    return this.tasksRepository.find({ where: whereClause });
  }



}
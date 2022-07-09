/* eslint-disable prettier/prettier */

import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
// import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

import { Repository } from 'typeorm';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async getTasks(filterDTO: GetTasksFilterDTO): Promise<Task[]> {
    const { status, search } = filterDTO;
    console.log('status', status, 'search', search);
    let query = this.tasksRepository.createQueryBuilder('task').select('task');
    if (status) {
      query = query.andWhere('task.status = :status', { status: status });
    }
    if (search) {
      query = query.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
        {
          search: `%${search}%`,
        },
      );
    }

    console.log(query);

    const tasks = await query.getMany();
    console.log('tasks', tasks);
    return tasks;
  }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne({ id: id });
    if (!found) {
      throw new NotFoundException(`Task with id ${id} was not found`);
    }
    return found;
  }

  async deleteTaskById(id: string): Promise<void> {
    const result = await this.tasksRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with id ${id} was not found`);
    }
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const taskToUpdate = await this.getTaskById(id);
    taskToUpdate.status = status;
    await this.tasksRepository.save(taskToUpdate);
    return taskToUpdate;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.tasksRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });

    await this.tasksRepository.save(task);
    return task;
  }
}

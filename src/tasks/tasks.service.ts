/* eslint-disable prettier/prettier */

import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { NotFoundError } from 'rxjs';
// import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TasksRepository } from './tasks.repository';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}
  //   getAllTasks(): Task[] {
  //     return this.tasks;
  //   }
  //   getTasksWithFilters(filterDTO: GetTasksFilterDTO): Task[] {
  //     const { status, search } = filterDTO;
  //     let tasks = this.getAllTasks();
  //     if (status) {
  //       tasks = tasks.filter((task) => task.status === status);
  //     }
  //     if (search) {
  //       const filterBySearch = (task: Task) => {
  //         if (
  //           task.title.toLowerCase().includes(search) ||
  //           task.description.toLowerCase().includes(search)
  //         ) {
  //           return true;
  //         }
  //         return false;
  //       };
  //       tasks = tasks.filter((task) => filterBySearch(task));
  //     }
  //     if (tasks.length > 0) {
  //       return tasks;
  //     }
  //     throw new NotFoundException('No matching task was found');
  //   }

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

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = this.tasksRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    await this.tasksRepository.save(task);
    return task;
  }
}

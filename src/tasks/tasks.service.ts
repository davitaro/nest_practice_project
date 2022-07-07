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
import { Repository } from 'typeorm';

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
    console.log('found', found);
    if (!found) {
      throw new NotFoundException('this task was not found');
    }
    return found;
  }

  //   getTaskById(id: string): Task {
  //     const found = this.tasks.find((t) => t.id === id);
  //     if (!found) {
  //       throw new NotFoundException('no task with this id found');
  //     }
  //     return found;
  //   }
  //   deleteTaskById(id: string): string {
  //     const found = this.getTaskById(id);
  //     const refreshedTasks = this.tasks.filter((task) => task.id !== found.id);
  //     this.tasks = refreshedTasks;
  //     return `Task with id ${id} has been deleted successfully`;
  //   }
  //   updateTaskStatus(id: string, status: TaskStatus) {
  //     const taskToUpdate = this.getTaskById(id);
  //     taskToUpdate.status = status;
  //     return taskToUpdate;
  //   }
  //   createTask(createTaskDto: CreateTaskDto): Task {
  //     const { title, description } = createTaskDto;
  //     const task: Task = {
  //       id: uuid(),
  //       title,
  //       description,
  //       status: TaskStatus.OPEN,
  //     };
  //     this.tasks.push(task);
  //     return task;
  //   }
}

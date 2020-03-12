import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid/v1';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) {}

  async getAllTasks() {
    //return this.tasks;
    return await this.taskModel.find();
  }

  getFilterdTask(filterDto: GetTaskFilterDto) {
    const { status, search } = filterDto;

    // let tas = this.getAllTasks();

    // if (status) {
    //   tas = tas.filter(t => t.status === status);
    // }
    // if (search) {
    //   tas = tas.filter(
    //     t => t.title.includes(search) || t.description.includes(search),
    //   );
    // }

    //  return tas;
  }

  getTaskById(id: String): Task {
    const found = this.tasks.find(task => {
      return task.id === id;
    });

    if (!found) {
      throw new NotFoundException(`Task with id "${id}"not found`);
    }

    return found;
  }

  async addTask(createTaskDto: CreateTaskDto) {
    const { title, description } = createTaskDto;
    // const task: Task = {
    //   id: uuid(),
    //   title,
    //   description,
    //   status: TaskStatus.OPEN,
    // };

    const newTask = new this.taskModel({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    // this.tasks.push(task);

    const result = await newTask.save();
    return result as string;
  }

  deleteTaskById(id: String): void {
    this.getTaskById(id);
    this.tasks.forEach(task => {
      console.log(task.id);
    });

    const filterdTasks = this.tasks.filter(task => {
      return task.id !== id;
    });

    this.tasks = [...filterdTasks];
  }

  updateTaskStatusById(id: String, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    console.log(task);
    task.status = status;
    return task;
  }
}

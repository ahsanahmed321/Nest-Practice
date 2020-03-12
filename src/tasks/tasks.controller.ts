import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UsePipes,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task-dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { promises } from 'fs';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}
  @Get()
  async getTasks(@Query(ValidationPipe) filterDto: GetTaskFilterDto) {
    if (Object.keys(filterDto).length) {
      return this.taskService.getFilterdTask(filterDto);
    } else {
      return await this.taskService.getAllTasks();
    }
  }

  @Get('/:id')
  async getTaskById(@Param('id') id: String) {
    return await this.taskService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async addTask(@Body() createTaskDto: CreateTaskDto) {
    return await this.taskService.addTask(createTaskDto);
  }

  @Delete('/:id')
  async deleteTaskById(@Param('id') id: String) {
    await this.taskService.deleteTaskById(id);
  }

  @Patch('/:id/status')
  async updateTaskStatusById(
    @Param('id') id: String,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  ) {
    return await this.taskService.updateTaskStatusById(id, status);
  }
}

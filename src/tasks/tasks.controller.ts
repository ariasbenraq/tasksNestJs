import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  /**
   * GET /tasks
   * Returns all tasks.
   */
  @Get()
  getAll(): Promise<Task[]> {
    return this.tasksService.getAllTasks();
  }

  /**
   * GET /tasks/:id
   * Returns a task by id.
   */
  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  /**
   * POST /tasks
   * Creates a new task.
   */
  @Post()
  create(
    @Body() dto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.createTask(dto, user );
  }

  /**
   * DELETE /tasks/:id
   * Deletes a task by id.
   * Responds 204 No Content on success.
   */
  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.tasksService.deleteTask(id);
  }
}

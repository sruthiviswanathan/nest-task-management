import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Task } from './task.model';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task.dto';


@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Post()
  createNewTask(@Body() CreateTaskDto: CreateTaskDto): Task {
    return this.tasksService.createNewTask(CreateTaskDto);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): void {
    return this.tasksService.deleteTaskById(id);
  }

  @Patch()
  UpdateTaskStatus(@Body() updateTaskStatusDto: UpdateTaskStatusDto): Task {
    return this.tasksService.updateTaskStatus(updateTaskStatusDto);
  }

}

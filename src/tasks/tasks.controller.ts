import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/user.entity';
import { GetUser } from '../auth/getUser.decorator';


@Controller('tasks')
@UseGuards(AuthGuard())
@UsePipes(ValidationPipe)
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto, @GetUser() user: User): Promise<Task[]> {
    return this.tasksService.getTasksWithFilter(filterDto, user);
  }

  @Post()
  createNewTask(@Body() CreateTaskDto: CreateTaskDto, @GetUser() user: User): Promise<Task> {
    return this.tasksService.createNewTask(CreateTaskDto, user);
  }

  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<any> {
    return this.tasksService.deleteTaskById(id, user);
  }
 
  @Patch('/:id')
  UpdateTaskStatus(@Param('id', ParseIntPipe) id: number, @Body('status', TaskStatusValidationPipe) status: TaskStatus, @GetUser() user: User): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, status, user);
  }

}

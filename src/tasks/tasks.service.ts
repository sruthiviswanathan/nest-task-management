import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
	}
	
	createNewTask(createTaskDto: CreateTaskDto): Task {
		const task: Task = {
      id: uuidv4(),
     	title: createTaskDto.title,
      description: createTaskDto.description,
      status: TaskStatus.OPEN
    };
		this.tasks.push(task);
		return task;
	}

	getTaskById(id: string): Task {
		return this.tasks.find(task => task.id === id);
	}

	deleteTaskById(id: string): void {
		const taskIndex: number = this.tasks.findIndex(task => task.id === id);
		this.tasks.splice(taskIndex, 1);
	}

	 updateTaskStatus(updateTaskStatusDto: UpdateTaskStatusDto): Task {
		const updatedTask = this.tasks.find(task => task.id === updateTaskStatusDto.id);
		const taskIndex: number = this.tasks.findIndex(task => task.id === updateTaskStatusDto.id);
		updatedTask.status = updateTaskStatusDto.status;
		this.tasks.splice(taskIndex, 1, updatedTask);
		return updatedTask;
	}
}

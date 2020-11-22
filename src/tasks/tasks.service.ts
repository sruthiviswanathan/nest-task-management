import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Utils } from './utils/utils';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  private utils = new Utils();

  	getAllTasks(): Task[] {
    	return this.tasks;
	}

	getTasksWithFilter(filterDto: GetTasksFilterDto): Task[] {
		return this.tasks.filter(task => {
			return (task.status == filterDto.status) && (task.title.includes(filterDto.search) || task.description.includes(filterDto.search))
		});
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
		const task = this.utils.findElementById(this.tasks, id);
		return task;
	}

	deleteTaskById(id: string): void {
		const taskIndex: number = this.utils.findIndexOfElementById(this.tasks, id);		
		this.tasks.splice(taskIndex, 1);
	}

	 updateTaskStatus(id: string, status: TaskStatus): Task {
		const taskToBeUpdated = this.utils.findElementById(this.tasks, id);
		const taskIndex: number = this.utils.findIndexOfElementById(this.tasks, id);
		taskToBeUpdated.status = status;
		this.tasks.splice(taskIndex, 1, taskToBeUpdated);
		return taskToBeUpdated;
	}
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Like } from 'typeorm';
import { Utils } from './utils/utils';

@Injectable()
export class TasksService {
    constructor(@InjectRepository(TaskRepository) private taskRepository: TaskRepository,
                private utils: Utils) {}

	async getTasksWithFilter(filterDto: GetTasksFilterDto): Promise<Task[]> {
        return this.taskRepository.getTasks(filterDto);
	}
	
	async createNewTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto);
	}

	async getTaskById(id: number): Promise<Task> {
        const task = await this.taskRepository.findOne(id);
        if (!task) {
            throw new NotFoundException(this.utils.taskNotFoundErrorMessage(id));
        }
        return task;
	}

	async deleteTaskById(id: number): Promise<any> {
        const result = await this.taskRepository.delete(id);
        if (result.affected == 0) {
            throw new NotFoundException(this.utils.taskNotFoundErrorMessage(id));
        }
        return 'Successfully deleted task';
	}

	async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
        const taskToBeUpdated: Task = await this.getTaskById(id);
        taskToBeUpdated.status = status;
        await taskToBeUpdated.save();
        return taskToBeUpdated;
	}
}

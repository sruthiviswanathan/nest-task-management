import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Utils } from './utils/utils';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {
    constructor(@InjectRepository(TaskRepository) private taskRepository: TaskRepository,
                private utils: Utils) {}

        async getTasksWithFilter(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
        return this.taskRepository.getTasks(filterDto, user);
        }
	
	async createNewTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto, user);
	}

	async getTaskById(id: number, user: User): Promise<Task> {
        const task = await this.taskRepository.findOne({where: {id, userId: user.id}});
        if (!task) {
            throw new NotFoundException(this.utils.taskNotFoundErrorMessage(id));
        }
        return task;
	}

	async deleteTaskById(id: number, user: User): Promise<any> {
        const result = await this.taskRepository.delete({id, userId: user.id});
        if (result.affected == 0) {
            throw new NotFoundException(this.utils.taskNotFoundErrorMessage(id));
        }
        return 'Successfully deleted task';
	}

	async updateTaskStatus(id: number, status: TaskStatus, user: User): Promise<Task> {
        const taskToBeUpdated: Task = await this.getTaskById(id, user);
        taskToBeUpdated.status = status;
        await taskToBeUpdated.save();
        return taskToBeUpdated;
	}
}

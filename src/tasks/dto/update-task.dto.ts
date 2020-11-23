import { TaskStatus } from "../task-status.enum";

export class UpdateTaskStatusDto {
    id: string;
    status: TaskStatus;
}
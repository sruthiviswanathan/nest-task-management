import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class Utils {
    findElementById(array: any, id: string) {
        const object = array.find(element => element.id === id);
        if(!object) {
			throw new NotFoundException('Task with ' + id + ' not found');
		}
        return object;
    }

    findIndexOfElementById(array: any, id: string) {
        const foundIndex = array.findIndex(element => element.id === id);
        if (foundIndex < 0) {
            throw new NotFoundException('Task with ' + id + ' not found');
        }
        return foundIndex;
    }

    taskNotFoundErrorMessage(id: number) {
        const errorMessage = 'Task with ' + id + ' not found';
        return errorMessage;
    }
}
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from "@nestjs/common";
import { ErrorMessages } from './errors/errors.enum';
import { SuccessResponse } from '../common/response/successResponse';
@Entity()
@Unique(['username'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    async validatePassword(password: string): Promise<any> {
        const hash = await bcrypt.hash(password, this.salt);
        if (hash === this.password) {
            return new SuccessResponse('Logged In successfully');
        } else {
            throw new UnauthorizedException(ErrorMessages.USER_NOT_FOUND_ERR_MESSAGE);
        }
    }
}
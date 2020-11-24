import { ConflictException, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { User } from "./user.entity";
import { ErrorMessages, ErrorCodes } from './errors/errors.enum';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
        const { username, password } = authCredentialsDto;
        const salt: string = await bcrypt.genSalt();
        const user = new User();
        user.username = username;
        user.password = await this.hashPassword(password, salt);
        user.salt = salt;
        try {
            await user.save();
        } catch(error) {
            if (error.code === ErrorCodes.UNIQUE_CONSTRAINT_ERR_CODE) {
                throw new ConflictException(ErrorMessages.UNIQUE_CONSTRAINT_ERR_MESSAGE);
            } else {
                throw new InternalServerErrorException();
            }
        }
        return user;
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return await bcrypt.hash(password, salt);
    }

    async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<any> {
        const {username, password} = authCredentialsDto;
        const user = await this.findOne({username});
        const isUserValid = await user.validatePassword(password);
        if (!isUserValid) {
            throw new UnauthorizedException(ErrorMessages.USER_NOT_FOUND_ERR_MESSAGE);
        }
        return username;
    }
}
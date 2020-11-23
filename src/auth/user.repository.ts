import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { User } from "./user.entity";
import { ErrorMessages, ErrorCodes } from './errors/errors.enum';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
        const { username, password } = authCredentialsDto;
        const user = new User();
        user.username = username;
        user.password = password;
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
}
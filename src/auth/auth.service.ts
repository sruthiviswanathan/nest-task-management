import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ErrorMessages } from './errors/errors.enum';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(UserRepository) private userRepository: UserRepository) {}

    signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
        return this.userRepository.signUp(authCredentialsDto);
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<User> {
        const { username, password } = authCredentialsDto;
        const user = await this.userRepository.findOne({username, password});
        if (!user) {
            throw new UnauthorizedException(ErrorMessages.USER_NOT_FOUND_ERR_MESSAGE);
        }
        return user;
    }
}

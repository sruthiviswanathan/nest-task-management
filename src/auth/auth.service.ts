import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwtPayload.interface';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService) {}

    signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
        return this.userRepository.signUp(authCredentialsDto);
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
        const username: string = await this.userRepository.validateUserPassword(authCredentialsDto);
        const payload: JwtPayload = { username };
        const accessToken: string = await this.jwtService.sign(payload);
        return {accessToken};
    }   
}

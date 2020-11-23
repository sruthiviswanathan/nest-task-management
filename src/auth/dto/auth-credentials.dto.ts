import { IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto {
    @IsNotEmpty()   
    username: string;

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    password: string;
}
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignInDto {
    @IsEmail({}, {message: 'not a valid email'})
    @IsNotEmpty({message: 'email can not be empty'}) 
    email: string;

    @IsString({message: 'password should be string'})
    @IsNotEmpty({message: 'password can not be empty'})
    password: string;
} 
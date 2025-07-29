import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class SignUpDto {
    @IsOptional()
    @IsString({message: 'userName should be string'})
    firstName: string;

    @IsOptional()
    @IsString({message: 'userName should be string'})
    lastName: string;

    @IsEmail({}, {message: 'not a valid email'})
    @IsNotEmpty({message: 'email can not be empty'}) 
    email: string;

    @IsString({message: 'password should be string'})
    @IsNotEmpty({message: 'password can not be empty'})
    password: string;
} 
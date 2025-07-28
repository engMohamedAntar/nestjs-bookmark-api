import { IsEmail, IsString } from "class-validator";

export class SignUpDto {
    @IsString({message: 'userName should be string'})
    userName: string;
    @IsEmail({}, {message: 'not a valid email'})
    email: string;
    password: string;
}
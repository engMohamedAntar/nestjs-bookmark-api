//userResponseDto

import { Exclude } from "class-transformer";

export class UserResponseDto{
    id:number;
    firstName: string | null;
    lastName: string | null;
    email: string;
    @Exclude()
    hash: string;
    createdAt: Date;
    updatedAt: Date;
    
    constructor(partial: Partial<UserResponseDto>){
        Object.assign(this, partial);
    }
}
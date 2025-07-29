//auth.service.ts
import * as bcrypt from 'bcrypt';

import { Injectable } from '@nestjs/common';
import { SignUpDto } from 'src/dto/signup.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserResponseDto } from 'src/dto/userResponse.dto';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}
  signIn() {
    return { msg: 'I have signed in' };
  }

  async signUp(body: SignUpDto): Promise<UserResponseDto>{
    //get the password and hash it
    const hash= await bcrypt.hash(body.password, 10);
    //create the new user
    const user= await this.prismaService.user.create({
        data: {
            email: body.email,
            hash,
            firstName: body.firstName,
            lastName: body.lastName,
        }
    });
    //return the created user
    return new UserResponseDto(user);
  }
}

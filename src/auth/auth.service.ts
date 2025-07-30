//auth.service.ts
import * as bcrypt from 'bcrypt';

import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { SignUpDto } from 'src/dto/signup.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserResponseDto } from 'src/dto/userResponse.dto';
import { Prisma } from '@prisma/client';


@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}
  signIn() {
    return { msg: 'I have signed in' };
  }

  async signUp(body: SignUpDto): Promise<UserResponseDto> {
    //get the password and hash it
    const hash = await bcrypt.hash(body.password, 10);

    try {
      //create the new user
      const user = await this.prismaService.user.create({
        data: {
          email: body.email,
          hash,
          firstName: body.firstName,
          lastName: body.lastName,
        },
      });
      //return the created user
      return new UserResponseDto(user);
    } catch (err) {
      
      if (err instanceof Prisma.PrismaClientKnownRequestError&& err.code === 'P2002')
        throw new BadRequestException('email already exist');
      throw new InternalServerErrorException('Internal server error');
    }
  }
}

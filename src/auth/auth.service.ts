//auth.service.ts
import * as bcrypt from 'bcrypt';

import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { SignUpDto } from 'src/dto/signup.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserResponseDto } from 'src/dto/userResponse.dto';
import { Prisma } from '@prisma/client';
import { SignInDto } from 'src/dto/signin.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signIn(body: SignInDto): Promise<UserResponseDto> {
    // find user
    const user = await this.prismaService.user.findFirst({
      where: {
        email: body.email,
      },
    });

    // check if exit or not
    if (!user)
      throw new NotFoundException(`No user found for this email ${body.email}`);
    // compare passwords
    const mached = await bcrypt.compare(body.password, user.hash);

    if (!mached) throw new ForbiddenException('invalid email or password');
    // return the user if exit
    const token= this.jwtService.sign({sub: user.id, firstName: user.firstName});
    return new UserResponseDto(user, token);
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
      const token = this.jwtService.sign({
        sub: user.id,
        firstname: user.firstName,
      });
      //return the created user
      return new UserResponseDto(user, token);
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2002'
      )
        throw new BadRequestException('email already exist');
      throw new InternalServerErrorException('Internal server error');
    }
  }
}

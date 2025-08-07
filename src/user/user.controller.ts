//user.controller.ts
import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(private userSirvice: UserService) {}
  
  @UseGuards(AuthGuard('jwt'))
  @Get('/')
  getAllUsers(){
    return this.userSirvice.getAllUsers(); 
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/getMe')
  getMe(@GetUser() user: User){
    return user;
  }

}

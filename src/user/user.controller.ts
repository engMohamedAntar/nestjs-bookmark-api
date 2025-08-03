//user.controller.ts
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('users')
export class UserController {
  constructor(private userSirvice: UserService) {}
  
  @UseGuards(AuthGuard('jwt'))
  @Get('/')
  getAllUsers(@Req() req: Request){
    console.log(req.user);
    
    return this.userSirvice.getAllUsers();
  } 
}

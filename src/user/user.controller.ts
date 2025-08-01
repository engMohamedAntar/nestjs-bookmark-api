import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UserController {
  constructor(private userSirvice: UserService) {}
  
  @UseGuards(AuthGuard)
  @Get('/')
  getAllUsers(){
    return this.userSirvice.getAllUsers();
  }
}

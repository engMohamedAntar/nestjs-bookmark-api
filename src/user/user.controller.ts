//user.controller.ts
import { Body, Controller, Get, Patch, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { EditUserDto } from 'src/dto/edit-user.dto';
import { User } from 'generated/prisma';

@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UserController {
  constructor(private userSirvice: UserService) {}

  @Get('/')
  getAllUsers(@Query() query) {   
    return this.userSirvice.getAllUsers(query);
  }

  @Get('/getMe')
  getMe(@GetUser() user: User) {
    return user;
  }

  @Patch()
  editUser(@GetUser('id') userId ,@Body() dto: EditUserDto) {
    return this.userSirvice.editUser(userId, dto);
  }
}

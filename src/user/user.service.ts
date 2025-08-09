import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async getAllUsers() {
    const users = await this.prismaService.user.findMany();
    return users; 
  }

  async editUser(userId, body){
    const user= await this.prismaService.user.update({
      where:{
        id: userId
      },
      data: {
        ...body,
        userId
      }
    })
    const {hash, ...userWithoutHash}= user;
    return userWithoutHash;
  }
  
}

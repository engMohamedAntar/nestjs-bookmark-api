import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}
  async getAllUsers() {
    const users = await this.prismaService.user.findMany();
    return users; 
  }
}

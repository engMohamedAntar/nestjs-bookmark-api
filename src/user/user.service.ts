import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async getAllUsers(query: any) {
    const { sort, ...filter } = query;

    let orderBy: any = undefined;

    if (sort) {
      let field = sort;
      let direction= 'asc';

      // Allow descending if sort starts with "-"
      if (sort.startsWith('-')) {
        field = sort.substring(1);
        direction = 'desc';
      }

      orderBy = { [field]: direction };
    }

    const users = await this.prismaService.user.findMany({
      where: filter,
      orderBy,
    });
    return users;
  }

  async editUser(userId, body) {
    const user = await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        ...body,
        userId,
      },
    });
    const { hash, ...userWithoutHash } = user;
    return userWithoutHash;
  }
}

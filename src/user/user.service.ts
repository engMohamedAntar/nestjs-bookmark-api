import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async getAllUsers(query: any) {
    const { sort, fields, keyword, limit, page, ...filter } = query;

    //keyword searching
    if (keyword) {
      filter.OR = [
        { firstName: { contains: keyword, mode: 'insensitive' } },
        { lastName: { contains: keyword, mode: 'insensitive' } },
      ];
    }
    //sorting
    let orderBy: any = undefined;
    if (sort) {
      let field = sort;
      let direction = 'asc';

      if (field.startsWith('-')) {
        field = sort.substring(1);
        direction = 'desc';
      }
      orderBy = { [field]: direction };
    }

    //field selection
    let select: any = undefined;
    if (fields) {
      const fieldsArray = fields.split(',');
      select = fieldsArray.reduce((acc, curr) => {
        acc[curr] = true;
        return acc;
      }, {});
    }

    //pagination
    const take = limit ? limit * 1 : 10;
    const skip = page ? (page - 1) * take : 0;

    const users = await this.prismaService.user.findMany({
      where: filter,
      orderBy,
      select, // {firstName: true, lastName: true}
      take,
      skip,
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

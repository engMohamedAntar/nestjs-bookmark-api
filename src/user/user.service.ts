import { Injectable } from '@nestjs/common';
import { PrismaApiFeatures } from 'src/common/utils/PrismaApiFeatures';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async getAllUsers(query: Record<string, any>) {
    const apiFeature = new PrismaApiFeatures(query, ['firstName', 'lastName']);
    const options = apiFeature.buildOptions();

    const users = await this.prismaService.user.findMany(options);
    const total = await this.prismaService.user.count({ where: options.where });

    const paginationInfo = apiFeature.getPaginationInfo(total, users.length);
    return { paginationInfo, users };
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
    console.log(`from user.service editUser function ${hash}`);

    return userWithoutHash;
  }
}

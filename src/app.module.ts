import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismaModule } from './prisma/prisma.module';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [AuthModule, UserModule, BookmarkModule, PrismaModule],
  providers: [{provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor}]
})
export class AppModule {}
 
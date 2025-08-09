import { Module } from '@nestjs/common';
import { BookmarkController } from './bookmark.controller';
import { BookmarkService } from './bookmark.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [BookmarkController],
  providers: [BookmarkService, PrismaService],
  imports: [AuthModule]
})
export class BookmarkModule {}

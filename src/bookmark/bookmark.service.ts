//bookmark.service.ts
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Bookmark } from 'generated/prisma';
import { CreateBookmarkDto } from 'src/dto/create-bookmark-dto';
import { UpdateBookmarkDto } from 'src/dto/update-bookmark-dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookmarkService {
  constructor(private prismaService: PrismaService) {}

  async getAllBookmarks(userId: number): Promise<Bookmark[]> {
    const bookmarks = await this.prismaService.bookmark.findMany({
      where: {
        userId,
      },
    });
    return bookmarks;
  }

  async getOneBookmark(bookmarkId: number, userId: number): Promise<Bookmark> {
    const bookmark = await this.prismaService.bookmark.findUnique({
      where: {
        id: bookmarkId,
        userId,
      },
    });
    if (!bookmark) throw new NotFoundException('No bookmark found for this id');
    return bookmark;
  }

  async createBookmark(
    userId: number,
    dto: CreateBookmarkDto,
  ): Promise<Bookmark> {
    const bookmark = await this.prismaService.bookmark.create({
      data: {
        ...dto,
        userId,
      },
    });
    return bookmark;
  }

  async updateBookmark(
    bookmarkId: number,
    userId: number,
    dto: UpdateBookmarkDto,
  ): Promise<Bookmark> {

    const bookmark = await this.prismaService.bookmark.findFirst({
      where: { id: bookmarkId, userId },
    });

    if (!bookmark)
      throw new ForbiddenException('Access denied');

    const updatedBookmark = await this.prismaService.bookmark.update({
      where: {
        id: bookmarkId,
      },
      data: dto,
    });

    return updatedBookmark;
  }

  async deleteBookmark(bookmarkId: number, userId: number): Promise<void> {
    const bookmark = await this.prismaService.bookmark.findFirst({
      where: { id: bookmarkId, userId },
    });
    if (!bookmark) throw new ForbiddenException('Access denied');

    await this.prismaService.bookmark.delete({
      where: {
        id: bookmarkId,
      },
    });
  }
}

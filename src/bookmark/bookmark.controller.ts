//bookmark.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto } from 'src/dto/create-bookmark-dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UpdateBookmarkDto } from 'src/dto/update-bookmark-dto';

@UseGuards(AuthGuard('jwt'))
@Controller('bookmark')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}

  @Get()
  getAllBookmarks(@GetUser('id') userId) {
    return this.bookmarkService.getAllBookmarks(userId);
  }

  @Get('/:id')
  getOneBookmark(@Param('id', ParseIntPipe) bookmarkId, @GetUser('id') userId) {
    return this.bookmarkService.getOneBookmark(bookmarkId, userId);
  }

  @Post()
  createBookmark(@GetUser('id') userId, @Body() dto: CreateBookmarkDto) {
    return this.bookmarkService.createBookmark(userId, dto);
  }

  @Patch('/:id')
  updateBookmark(
    @Param('id', ParseIntPipe) bookmarkId,
    @GetUser('id') userId,
    @Body() dto: UpdateBookmarkDto,
  ) {
    return this.bookmarkService.updateBookmark(bookmarkId,userId, dto);
  }

  @HttpCode(204)
  @Delete('/:id')
  deleteBookmark( @Param('id', ParseIntPipe) bookmarkId, @GetUser('id') userId) {
    return this.bookmarkService.deleteBookmark(bookmarkId, userId);
  }

}

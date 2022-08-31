import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';

@Controller('bookmark')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @ApiBearerAuth('JWT')
  @UseGuards(JwtGuard)
  @Post()
  create(@GetUser() user: User, @Body() createBookmarkDto: CreateBookmarkDto) {
    return this.bookmarkService.create(user.id, createBookmarkDto);
  }

  @ApiBearerAuth('JWT')
  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.bookmarkService.findAll();
  }

  @ApiBearerAuth('JWT')
  @UseGuards(JwtGuard)
  @Get('user')
  findOneByUserId(@GetUser() user: User) {
    return this.bookmarkService.findOneByUserId(user.id);
  }

  @ApiBearerAuth('JWT')
  @UseGuards(JwtGuard)
  @Get('group/:id')
  findBookmarksByGroupId(@GetUser() user: User, @Param('id') id: string) {
    return this.bookmarkService.findBookmarksByGroupId(user.id, id);
  }

  @Get('public/group/:id')
  findBookmarksByPublicGroupId(@Param('id') id: string) {
    return this.bookmarkService.findBookmarksByPublicGroupId(id);
  }

  @ApiBearerAuth('JWT')
  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookmarkService.findOne(id);
  }

  @ApiBearerAuth('JWT')
  @UseGuards(JwtGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBookmarkDto: UpdateBookmarkDto,
  ) {
    return this.bookmarkService.update(id, updateBookmarkDto);
  }

  @ApiBearerAuth('JWT')
  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookmarkService.remove(id);
  }
}

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
import { Roles } from 'src/user/decorator/roles.decorator';
import { UserRole } from 'src/user/enums/user-role.enum';
import { RolesGuard } from 'src/user/guard/role.guard';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';

@ApiBearerAuth('JWT')
@UseGuards(JwtGuard, RolesGuard)
@Controller('bookmark')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @Post()
  @Roles(UserRole.USER)
  create(@GetUser() user: User, @Body() createBookmarkDto: CreateBookmarkDto) {
    return this.bookmarkService.create(user.id, createBookmarkDto);
  }

  @Get()
  @Roles(UserRole.ADMIN)
  findAll() {
    return this.bookmarkService.findAll();
  }

  @Get('user')
  @Roles(UserRole.USER)
  findOneByUserId(@GetUser() user: User) {
    return this.bookmarkService.findOneByUserId(user.id);
  }

  @Get('group/:id')
  @Roles(UserRole.USER)
  findBookmarksByGroupId(@GetUser() user: User, @Param('id') id: string) {
    return this.bookmarkService.findBookmarksByGroupId(user.id, id);
  }

  @Get(':id')
  @Roles(UserRole.ADMIN)
  findOne(@Param('id') id: string) {
    return this.bookmarkService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.USER)
  update(
    @Param('id') id: string,
    @Body() updateBookmarkDto: UpdateBookmarkDto,
  ) {
    return this.bookmarkService.update(id, updateBookmarkDto);
  }

  @Delete(':id')
  @Roles(UserRole.USER)
  remove(@Param('id') id: string) {
    return this.bookmarkService.remove(id);
  }
}

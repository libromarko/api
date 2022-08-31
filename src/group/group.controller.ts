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
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { User } from '@prisma/client';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @ApiBearerAuth('JWT')
  @UseGuards(JwtGuard)
  @Post()
  create(@GetUser() user: User, @Body() createGroupDto: CreateGroupDto) {
    return this.groupService.create(user.id, createGroupDto);
  }

  @ApiBearerAuth('JWT')
  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.groupService.findAll();
  }

  @ApiBearerAuth('JWT')
  @UseGuards(JwtGuard)
  @Get('user')
  findByUserId(@GetUser() user: User) {
    return this.groupService.findByUserId(user.id);
  }

  @Get('public')
  findAllPublic() {
    return this.groupService.findAllPublic();
  }

  @Get('public/:id')
  findPublic(@Param('id') id: string) {
    return this.groupService.findPublic(id);
  }

  @ApiBearerAuth('JWT')
  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupService.findOne(+id);
  }

  @ApiBearerAuth('JWT')
  @UseGuards(JwtGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupService.update(id, updateGroupDto);
  }

  @ApiBearerAuth('JWT')
  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupService.remove(id);
  }
}

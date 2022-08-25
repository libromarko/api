import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Injectable()
export class GroupService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userId, createGroupDto: CreateGroupDto) {
    return await this.prismaService.group.create({
      data: {
        name: createGroupDto.name,
        user: {
          connect: { id: userId },
        },
        bookmarks: {
          create: [],
        },
      },
    });
  }

  async findAll() {
    return await this.prismaService.group.findMany();
  }

  async findByUserId(userId: string) {
    return await this.prismaService.group.findMany({
      where: {
        userId: userId,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} group`;
  }

  async update(id: string, updateGroupDto: UpdateGroupDto) {
    return await this.prismaService.group.update({
      where: {
        id: id,
      },
      data: updateGroupDto,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} group`;
  }
}

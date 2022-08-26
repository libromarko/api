import { Injectable } from '@nestjs/common';
import { Group } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';

@Injectable()
export class BookmarkService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userId: string, createBookmarkDto: CreateBookmarkDto) {
    let group: Group;

    if (!createBookmarkDto.groupId) {
      group = await this.prismaService.group.findFirst({
        where: {
          userId: userId,
        },
      });
    }

    return await this.prismaService.bookmark.create({
      data: {
        description: createBookmarkDto.description,
        url: createBookmarkDto.url,
        group: {
          connect: {
            id: createBookmarkDto.groupId
              ? createBookmarkDto.groupId
              : group.id,
          },
        },
        user: {
          connect: { id: userId },
        },
      },
    });
  }

  async findAll() {
    return await this.prismaService.bookmark.findMany();
  }

  async findOne(id: string) {
    return await this.prismaService.bookmark.findUnique({
      where: {
        id: id,
      },
    });
  }

  async findBookmarksByGroupId(userId: string, groupId: string) {
    return await this.prismaService.bookmark.findMany({
      where: {
        userId: userId,
        groupId: groupId,
      },
    });
  }

  async findOneByUserId(userId: string) {
    return await this.prismaService.bookmark.findMany({
      where: {
        userId: userId,
      },
    });
  }

  async findSkipTake(userId: string, skip: number, take: number) {
    return await this.prismaService.bookmark.findMany({
      skip: skip,
      take: take,
      where: {
        userId: userId,
      },
    });
  }

  async update(id: string, updateBookmarkDto: UpdateBookmarkDto) {
    return await this.prismaService.bookmark.update({
      where: {
        id: id,
      },
      data: updateBookmarkDto,
    });
  }

  async remove(id: string) {
    return await this.prismaService.bookmark.delete({
      where: {
        id: id,
      },
    });
  }
}

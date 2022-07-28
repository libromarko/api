import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';

@Injectable()
export class BookmarkService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userId: string, createBookmarkDto: CreateBookmarkDto) {
    const group = await this.prismaService.group.findFirst({
      where: {
        userId: userId,
      },
    });

    return await this.prismaService.bookmark.create({
      data: {
        summary: createBookmarkDto.summary,
        url: createBookmarkDto.url,
        group: {
          connect: { id: group.id },
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

  async findOneByUserId(userId: string) {
    return await this.prismaService.bookmark.findMany({
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

  remove(id: number) {
    return `This action removes a #${id} bookmark`;
  }
}

import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Injectable()
export class GroupService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userId: string, createGroupDto: CreateGroupDto) {
    if (createGroupDto.name === 'inbox') {
      throw new ForbiddenException(
        'Inbox is a special group and cannot be created.',
      );
    }

    return await this.prismaService.group.create({
      data: {
        name: createGroupDto.name,
        public: createGroupDto.public ? true : false,
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

  async findAllPublic() {
    return await this.prismaService.group.findMany({
      where: {
        public: true,
      },
    });
  }

  async findPublic(groupId: string) {
    return await this.prismaService.group.findFirst({
      where: {
        AND: [{ id: groupId }, { public: true }],
      },
      include: {
        bookmarks: true,
      },
    });
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
    const isInbox = await this.groupIsInbox(id);

    if (isInbox) {
      throw new ForbiddenException(
        'Inbox is a special group and cannot be updated.',
      );
    }

    return await this.prismaService.group.update({
      where: {
        id: id,
      },
      data: updateGroupDto,
    });
  }

  async remove(id: string) {
    const isInbox = await this.groupIsInbox(id);

    if (isInbox) {
      throw new ForbiddenException(
        'Inbox is a special group and cannot be removed.',
      );
    }

    return await this.prismaService.group.delete({
      where: {
        id: id,
      },
    });
  }

  async groupIsInbox(groupId: string) {
    const group = await this.prismaService.group.findUnique({
      where: {
        id: groupId,
      },
    });

    return group.name === 'inbox';
  }
}

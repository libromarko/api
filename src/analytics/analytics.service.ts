import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private readonly prismaService: PrismaService) {}

  findUsersCount(filter: any) {
    if (filter) {
      return this.prismaService.activation.count({
        where: {
          isActive: filter === 'true',
        },
      });
    }

    return this.prismaService.user.count();
  }

  findGroupsCount(filter: any) {
    if (filter) {
      return this.prismaService.group.count({
        where: {
          public: filter === 'true',
        },
      });
    }

    return this.prismaService.group.count();
  }

  findBookmarksCount() {
    return this.prismaService.bookmark.count();
  }
}

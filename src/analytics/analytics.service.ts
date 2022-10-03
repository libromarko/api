import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private readonly prismaService: PrismaService) {}

  findUsersCount() {
    return this.prismaService.user.count();
  }

  findActiveUsersCount() {
    return this.prismaService.activation.count({
      where: {
        isActive: true,
      },
    });
  }

  findInactiveUsersCount() {
    return this.prismaService.activation.count({
      where: {
        isActive: false,
      },
    });
  }

  findGroupsCount() {
    return this.prismaService.group.count();
  }

  findPublicGroupsCount() {
    return this.prismaService.group.count({
      where: {
        public: true,
      },
    });
  }

  findPrivateGroupsCount() {
    return this.prismaService.group.count({
      where: {
        public: false,
      },
    });
  }

  findBookmarksCount() {
    return this.prismaService.bookmark.count();
  }
}

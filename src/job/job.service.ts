import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JobService {
  private readonly logger = new Logger(JobService.name);
  constructor(private readonly prismaService: PrismaService) {}

  @Cron(CronExpression.EVERY_30_SECONDS)
  async handleDeleteInactiveUsers() {
    const deleted = await this.deletionOfInactiveUsers();
    this.logger.debug('handleDeleteInactiveUsers', deleted);
  }

  async deletionOfInactiveUsers() {
    const users = await this.prismaService.user.findMany({
      where: {
        activation: {
          isActive: false,
        },
      },
    });

    const deleteableUserId = users
      .filter((user) => {
        const deletable = new Date(user.createdAt);
        deletable.setDate(deletable.getDate() + 7);

        if (deletable < new Date()) {
          return user;
        }
      })
      .map((user) => user.id);

    const deleteUsers = await this.prismaService.user.deleteMany({
      where: {
        id: {
          in: deleteableUserId,
        },
      },
    });

    return deleteUsers;
  }
}

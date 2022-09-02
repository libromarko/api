import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ActivationService {
  constructor(private readonly prismaService: PrismaService) {}

  async findByUserId(userId: string) {
    return this.prismaService.activation.findUnique({
      where: {
        userId: userId,
      },
    });
  }

  findOne(id: string) {
    return this.prismaService.activation.update({
      where: {
        id: id,
      },
      data: {
        isActive: true,
      },
    });
  }
}

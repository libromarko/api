import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ActivationService {
  constructor(private readonly prismaService: PrismaService) {}

  async findByUserId(userId: string) {
    return await this.prismaService.activation.findUnique({
      where: {
        userId: userId,
      },
    });
  }

  async findOne(id: string) {
    const findedActivation = await this.prismaService.activation.findUnique({
      where: {
        id: id,
      },
    });

    if (findedActivation.isActive) {
      throw new ForbiddenException('Already activated!');
    }

    if (!findedActivation) {
      throw new ForbiddenException('Activation code not found!');
    }

    return await this.prismaService.activation.update({
      where: {
        id: id,
      },
      data: {
        isActive: true,
      },
    });
  }
}

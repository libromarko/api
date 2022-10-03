import { ForbiddenException, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '@prisma/client';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService, private readonly prismaService: PrismaService) {}

  async sendUserConfirmation(user: User, token: string) {
    const url = `https://libromarko.xyz/activation/${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      from: '"libromarko Team" <info@libromarko.xyz>',
      subject: 'Welcome to libromarko! Confirm your Email',
      template: __dirname + '/templates/confirmation',
      context: {
        name: user.email.substring(0, user.email.lastIndexOf('@')),
        url,
      },
    });
  }

  async createSubscription(createSubscriptionDto: CreateSubscriptionDto) {
    try {
      return await this.prismaService.mailSubscription.create({
        data: createSubscriptionDto,
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
    }
  }

  async findAllSubscription() {
    return await this.prismaService.mailSubscription.findMany();
  }

  async updateSubscription(id: string, updateSubscriptionDto: UpdateSubscriptionDto) {
    return await this.prismaService.mailSubscription.update({
      where: {
        id: id,
      },
      data: updateSubscriptionDto,
    });
  }

  async removeSubscribtion(id: string) {
    return await this.prismaService.mailSubscription.delete({
      where: {
        id: id,
      },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '@prisma/client';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

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
}

import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();
const config: ConfigService = new ConfigService();

async function main() {
  const admin = await prisma.user.findUnique({
    where: {
      email: config.get('ADMIN_EMAIL'),
    },
  });

  if (!admin) {
    const createdAdmin = await prisma.user.create({
      data: {
        email: config.get('ADMIN_EMAIL'),
        password: await argon2.hash(config.get('ADMIN_PASSWORD')),
        profile: {
          create: {},
        },
        activation: {
          create: {
            isActive: true,
          },
        },
        groups: {
          create: {
            name: 'inbox',
          },
        },
      },
    });

    console.log('Admin Created:', createdAdmin);
  } else {
    console.log('Admin Found:', admin);
  }
}

main();

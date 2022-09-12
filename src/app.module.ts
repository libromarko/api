import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { ActivationModule } from './activation/activation.module';
import { PaymentModule } from './payment/payment.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { GroupModule } from './group/group.module';
import { MailModule } from './mail/mail.module';
import { JobModule } from './job/job.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './user/guard/role.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    AuthModule,
    PrismaModule,
    UserModule,
    ProfileModule,
    ActivationModule,
    PaymentModule,
    BookmarkModule,
    GroupModule,
    MailModule,
    JobModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

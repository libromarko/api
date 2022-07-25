import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { ActivationModule } from './activation/activation.module';
import { PaymentModule } from './payment/payment.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { GroupModule } from './group/group.module';
import { TagModule } from './tag/tag.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    UserModule,
    ProfileModule,
    ActivationModule,
    PaymentModule,
    BookmarkModule,
    GroupModule,
    TagModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

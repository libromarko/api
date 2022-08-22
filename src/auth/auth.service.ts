import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as argon2 from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignupAuthDto, SigninAuthDto } from './dto/';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(signupAuthDto: SignupAuthDto) {
    const hash = await argon2.hash(signupAuthDto.password);

    try {
      await this.prismaService.user.create({
        data: {
          email: signupAuthDto.email,
          password: hash,
          profile: {
            create: {},
          },
          activation: {
            create: {},
          },
          groups: {
            create: {
              name: 'inbox',
            },
          },
        },
      });

      return { signup_success: true };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
    }
  }

  async signin(signinAuthDto: SigninAuthDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: signinAuthDto.email,
      },
    });
    const passwordMatches = await argon2.verify(
      user.password,
      signinAuthDto.password,
    );

    if (!user || !passwordMatches) {
      throw new ForbiddenException('Credentials incorrect');
    }

    const token = await this.signToken(user.id, user.email);
    return { access_token: token };
  }

  signToken(userId: string, email: string): Promise<string> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');

    return this.jwt.signAsync(payload, {
      expiresIn: '30d',
      secret: secret,
    });
  }
}

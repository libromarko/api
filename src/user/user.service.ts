import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRole } from './enums/user-role.enum';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const hash = await argon2.hash(createUserDto.password);

    if (createUserDto.role === 'ADMIN') {
      return await this.prismaService.user.create({
        data: {
          email: createUserDto.email,
          password: hash,
          role: createUserDto.role,
        },
      });
    }

    return await this.prismaService.user.create({
      data: {
        email: createUserDto.email,
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
  }

  async findFilterByRole(role: UserRole) {
    return await this.prismaService.user.findMany({
      where: {
        role: role,
      },
    });
  }

  async findAll() {
    return await this.prismaService.user.findMany();
  }

  async findOne(id: string) {
    return await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.prismaService.user.update({
      where: {
        id: id,
      },
      data: updateUserDto,
    });
  }

  async remove(id: string) {
    return await this.prismaService.user.delete({
      where: {
        id: id,
      },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(private prismaService: PrismaService) {}

  create(createProfileDto: CreateProfileDto) {
    return 'This action adds a new profile';
  }

  findAll() {
    return `This action returns all profile`;
  }

  async findOne(id: string) {
    const profile = await this.prismaService.profile.findUnique({
      where: {
        id: id,
      },
    });

    return profile;
  }

  async findOneByUserId(userId: string) {
    const profile = await this.prismaService.profile.findUnique({
      where: {
        userId: userId,
      },
    });

    return profile;
  }

  async update(id: string, updateProfileDto: UpdateProfileDto) {
    const profile = await this.prismaService.profile.update({
      where: {
        id: id,
      },
      data: updateProfileDto,
    });

    return profile;
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}

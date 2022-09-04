import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { ActivationService } from './activation.service';

@Controller('activation')
export class ActivationController {
  constructor(private readonly activationService: ActivationService) {}

  @ApiBearerAuth('JWT')
  @UseGuards(JwtGuard)
  @Get('user')
  findActivationByUserId(@GetUser() user: User) {
    return this.activationService.findByUserId(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.activationService.findOne(id);
  }
}

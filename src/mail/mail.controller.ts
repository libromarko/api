import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { Roles } from 'src/user/decorator/roles.decorator';
import { UserRole } from 'src/user/enums/user-role.enum';
import { RolesGuard } from 'src/user/guard/role.guard';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('subscription')
  createSubscription(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    return this.mailService.createSubscription(createSubscriptionDto);
  }

  @ApiBearerAuth('JWT')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get('subscription')
  findAllSubscription() {
    return this.mailService.findAllSubscription();
  }

  @Patch('subscription/:id')
  updateSubscription(
    @Param('id') id: string,
    @Body() updateSubscriptionDto: UpdateSubscriptionDto,
  ) {
    return this.mailService.updateSubscription(id, updateSubscriptionDto);
  }

  @Delete('subscription/:id')
  removeSubscription(@Param('id') id: string) {
    return this.mailService.removeSubscribtion(id);
  }
}

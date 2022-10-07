import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { Roles } from 'src/user/decorator/roles.decorator';
import { UserRole } from 'src/user/enums/user-role.enum';
import { RolesGuard } from 'src/user/guard/role.guard';
import { AnalyticsService } from './analytics.service';

@ApiBearerAuth('JWT')
@UseGuards(JwtGuard, RolesGuard)
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('count/users')
  @Roles(UserRole.ADMIN)
  @ApiQuery({ name: 'active', type: Boolean, required: false })
  findUsersCount(@Query('active') filter?: boolean) {
    return this.analyticsService.findUsersCount(filter);
  }

  @Get('count/groups')
  @Roles(UserRole.ADMIN)
  @ApiQuery({ name: 'public', type: Boolean, required: false })
  findGroupsCount(@Query('public') filter?: boolean) {
    return this.analyticsService.findGroupsCount(filter);
  }

  @Get('count/bookmarks')
  @Roles(UserRole.ADMIN)
  findBookmarksCount() {
    return this.analyticsService.findBookmarksCount();
  }
}

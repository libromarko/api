import { Controller, Get } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('count/users')
  findUsersCount() {
    return this.analyticsService.findUsersCount();
  }

  @Get('count/active-users')
  findActiveUsersCount() {
    return this.analyticsService.findActiveUsersCount();
  }

  @Get('count/inactive-users')
  findInactiveUsersCount() {
    return this.analyticsService.findInactiveUsersCount();
  }

  @Get('count/groups')
  findGroupsCount() {
    return this.analyticsService.findGroupsCount();
  }

  @Get('count/public-groups')
  findPublicGroupsCount() {
    return this.analyticsService.findPublicGroupsCount();
  }

  @Get('count/private-groups')
  findPrivateGroupsCount() {
    return this.analyticsService.findPrivateGroupsCount();
  }

  @Get('count/bookmarks')
  findBookmarksCount() {
    return this.analyticsService.findBookmarksCount();
  }
}

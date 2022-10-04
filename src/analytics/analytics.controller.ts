import { Controller, Get, Query, Req } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('count/users')
  @ApiQuery({ name: 'active', type: Boolean, required: false })
  findUsersCount(@Query('active') filter?: boolean) {
    return this.analyticsService.findUsersCount(filter);
  }

  @Get('count/groups')
  @ApiQuery({ name: 'public', type: Boolean, required: false })
  findGroupsCount(@Query('public') filter?: boolean) {
    return this.analyticsService.findGroupsCount(filter);
  }

  @Get('count/bookmarks')
  findBookmarksCount() {
    return this.analyticsService.findBookmarksCount();
  }
}

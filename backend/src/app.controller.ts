import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { AppParentRoutes } from './app.routes';

@Controller(AppParentRoutes)
@ApiTags('App')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Get Hello' })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

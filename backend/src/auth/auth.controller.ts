import { Body, Controller, Post } from '@nestjs/common';
import { AuthParentRoutes } from './auth.routes';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterAccount } from './dto/request/RegisterAccount';

@ApiTags('authentication')
@Controller(AuthParentRoutes)
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Register a new account' })
  @Post()
  async registerAccount(@Body() request: RegisterAccount) {
    return this.authService.registerAccount(request);
  }
}

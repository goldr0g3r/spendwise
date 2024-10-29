import { Body, Controller, Post } from '@nestjs/common';
import { AuthParentRoutes, AuthRoutes } from './auth.routes';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterAccount } from './dto/request/RegisterAccount';
import { LoginAccount } from './dto/request/LoginAccount';

@ApiTags('authentication')
@Controller(AuthParentRoutes)
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Register a new account' })
  @Post(AuthRoutes.register)
  async registerAccount(@Body() request: RegisterAccount) {
    return this.authService.registerAccount(request);
  }

  @ApiOperation({ summary: 'Login to an account' })
  @Post(AuthRoutes.login)
  async loginAccount(@Body() request: LoginAccount) {
    return this.authService.loginAccount(request);
  }
}

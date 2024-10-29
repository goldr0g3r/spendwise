import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthParentRoutes, AuthRoutes } from './auth.routes';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterAccount } from './dto/request/RegisterAccount';
import { LoginAccount } from './dto/request/LoginAccount';
import APIResponse from 'src/common/dto/api/response/ApiResponse';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';

@ApiTags('authentication')
@Controller(AuthParentRoutes)
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @ApiOperation({ summary: 'Register a new account' })
  @Post(AuthRoutes.register)
  async registerAccount(@Body() request: RegisterAccount, @Req() req: Request) {
    /*
    TODO change this to a real device ID 
    */ const deviceId = randomUUID();
    return this.authService.registerAccount(
      request,
      deviceId,
      req.headers['user-agent'],
    );
  }

  @ApiOperation({ summary: 'Login to an account' })
  @Post(AuthRoutes.login)
  async loginAccount(@Body() request: LoginAccount, @Req() req: Request) {
    /*
    TODO change this to a real device ID 
    */ const deviceId = randomUUID();
    return this.authService.loginAccount(
      request,
      deviceId,
      req.headers['user-agent'],
    );
  }

  @ApiBearerAuth('accessToken')
  @UseGuards(AccessTokenGuard)
  @ApiOperation({ summary: 'get user profile' })
  @Post('profile')
  async profile(@Req() request: Request) {
    const accessToken = request.headers.authorization.split(' ')[1];
    const user = this.jwtService.decode(accessToken);
    return { user };
  }
}

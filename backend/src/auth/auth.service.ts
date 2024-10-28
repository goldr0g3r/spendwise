import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { envConfigToken } from 'src/common/constants/envToken';
import { IRegisterAccount } from 'src/common/interface/user/request/IRegisterAccount';
import { JWTToken } from 'src/common/types/auth';
import { Environment } from 'src/config';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private environment: ConfigService,
  ) {}

  async registerAccount(request: IRegisterAccount) {
    return this.userRepository.registerAccount(request);
  }

  async validateRefreshToken(refreshToken: JWTToken) {
    return this.jwtService.verify(refreshToken, {
      secret:
        this.environment.get<Environment>(envConfigToken).refreshTokenSecret,
    });
  }
}

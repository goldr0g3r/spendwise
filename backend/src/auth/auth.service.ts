import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UUID } from 'crypto';
import { envConfigToken } from 'src/common/constants/envToken';
import { ILoginAccount } from 'src/common/interface/user/request/ILoginAccount';
import { IRegisterAccount } from 'src/common/interface/user/request/IRegisterAccount';
import { IUserResponseWithTokens } from 'src/common/interface/user/response/IUserResponse';
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

  async loginAccount(request: ILoginAccount) {
    const user = await this.userRepository.loginAccount(request);
    if (!user) throw new UnprocessableEntityException('Unable to log you in');
    if (typeof user === 'string') throw new UnprocessableEntityException(user);

    const tokens = await this.generateTokens(user.username, user.id);

    return { user, tokens };
  }

  async validateRefreshToken(refreshToken: JWTToken) {
    return this.jwtService.verify(refreshToken, {
      secret:
        this.environment.get<Environment>(envConfigToken).refreshTokenSecret,
    });
  }

  async generateTokens(username: string, userId: UUID) {
    try {
      const [access, refresh] = await Promise.all([
        this.jwtService.signAsync(
          {
            username,
            id: userId,
          },
          {
            secret:
              this.environment.get<Environment>(envConfigToken)
                .accessTokenSecret,
            expiresIn:
              this.environment.get<Environment>(envConfigToken)
                .accessTokenExpiresIn,
          },
        ) as Promise<JWTToken>,
        this.jwtService.signAsync(
          {
            username,
            id: userId,
          },
          {
            secret:
              this.environment.get<Environment>(envConfigToken)
                .refreshTokenSecret,
            expiresIn:
              this.environment.get<Environment>(envConfigToken)
                .refreshTokenExpiresIn,
          },
        ) as Promise<JWTToken>,
      ]);

      return { access, refresh };
    } catch (error) {
      throw new UnauthorizedException(error.message.toString());
    }
  }
}

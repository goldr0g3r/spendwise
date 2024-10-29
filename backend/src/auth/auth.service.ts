import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { plainToClass } from 'class-transformer';
import { UUID } from 'crypto';
import { envConfigToken } from 'src/common/constants/envToken';
import { ILoginAccount } from 'src/common/interface/user/request/ILoginAccount';
import { IRegisterAccount } from 'src/common/interface/user/request/IRegisterAccount';
import { IUserResponseWithTokens } from 'src/common/interface/user/response/IUserResponse';
import { JWTToken } from 'src/common/types/auth';
import { Environment } from 'src/config';
import { UserResponseWithToken } from 'src/user/dto/response/userResponseWithToken';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private environment: ConfigService,
  ) {}

  async registerAccount(
    request: IRegisterAccount,
    deviceId: UUID,
    userAgent: string,
  ) {
    const user = await this.userRepository.registerAccount(request);
    if (!user)
      throw new UnprocessableEntityException('Unable to register user');
    if (typeof user === 'string') throw new UnprocessableEntityException(user);

    const tokens = await this.generateTokens(user.username, user.id);

    await this.userRepository.addRefreshToken(user.id, {
      deviceId: deviceId,
      refreshToken: tokens.refresh,
    });

    return this.toUserResponseWithTokens(user, tokens);
  }

  async loginAccount(
    request: ILoginAccount,
    deviceId: UUID,
    userAgent: string,
  ) {
    const user = await this.userRepository.loginAccount(request);
    if (!user) throw new UnprocessableEntityException('Unable to log you in');
    if (typeof user === 'string') throw new UnprocessableEntityException(user);

    const tokens = await this.generateTokens(user.username, user.id);
    await this.userRepository.addRefreshToken(user.id, {
      deviceId: deviceId,
      refreshToken: tokens.refresh,
    });
    return this.toUserResponseWithTokens(user, tokens);
  }

  async logoutAccount(userId: UUID, refreshToken: JWTToken) {
    return this.userRepository.logoutAccount(userId, refreshToken);
  }
  async validateRefreshToken(refreshToken: JWTToken) {
    const decode = this.jwtService.verify(refreshToken, {
      secret:
        this.environment.get<Environment>(envConfigToken).refreshTokenSecret,
    });
    return decode;
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

  private toUserResponseWithTokens(user: any, tokens: any) {
    return plainToClass(
      UserResponseWithToken,
      { user, tokens },
      {
        excludeExtraneousValues: true,
        excludePrefixes: ['password'],
        groups: ['user'],
      },
    );
  }
}

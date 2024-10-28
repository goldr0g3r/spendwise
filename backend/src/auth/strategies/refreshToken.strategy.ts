import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { envConfigToken } from 'src/common/constants/envToken';
import { JWTToken, JWTTokenPayload } from 'src/common/types/auth';
import { Environment } from 'src/config';
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    environment: ConfigService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        environment.get<Environment>(envConfigToken).refreshTokenSecret,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JWTTokenPayload) {
    const refreshToken = req.headers.authorization.split(' ')[1] as JWTToken;

    const user = await this.authService.validateRefreshToken(refreshToken);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

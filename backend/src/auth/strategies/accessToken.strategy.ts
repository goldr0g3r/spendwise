import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Environment } from 'src/config';
import { Request } from 'express';
import { UserRepository } from 'src/user/user.repository';
import { JWTTokenPayload } from 'src/common/types/auth';
import { envConfigToken } from 'src/common/constants/envToken';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    environment: ConfigService,
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: environment.get<Environment>(envConfigToken).accessTokenSecret,
      passReqToCallback: true,
      ignoreExpiration: false,
    });
  }

  async validate(req: Request, payload: JWTTokenPayload) {
    const userRoles = await this.userRepository.findUserRoles(payload.id);
    if (userRoles?.roles) return { ...payload, roles: userRoles.roles };

    return { ...payload, roles: [] };
  }
}

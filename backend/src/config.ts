import { IsInt, IsNotEmpty, Max, Min, validateSync } from 'class-validator';
import { IEnvironment } from './common/interface/environment';
import { Expose, plainToClass, Transform } from 'class-transformer';
import { registerAs } from '@nestjs/config';
import { envConfigToken } from './common/constants/envToken';

export class Environment implements IEnvironment {
  @IsNotEmpty()
  @IsInt()
  @Max(65535)
  @Min(1)
  @Expose({ name: 'PORT' })
  port: number;

  @IsNotEmpty()
  @Expose({ name: 'NODE_ENV' })
  nodeEnv: string;

  @IsNotEmpty()
  @Expose({ name: 'MONGODB_URI' })
  mongoURI: string;

  @IsNotEmpty()
  @Expose({ name: 'USER_DATABASE' })
  userDb: string;

  @IsNotEmpty()
  @Expose({ name: 'CATEGORIES_DATABASE' })
  categoriesDb: string;

  @IsNotEmpty()
  @Expose({ name: 'BANKACCOUNT_DATABASE' })
  bankDb: string;

  @IsNotEmpty()
  @Expose({ name: 'ACCESSTOKEN_SECRET' })
  accessTokenSecret: string;

  @IsNotEmpty()
  @Expose({ name: 'REFRESHTOKEN_SECRET' })
  refreshTokenSecret: string;
  @IsNotEmpty()
  @Expose({ name: 'ACCESSTOKEN_EXPIRES_IN' })
  accessTokenExpiresIn: string;
  @IsNotEmpty()
  @Expose({ name: 'REFRESHTOKEN_EXPIRES_IN' })
  refreshTokenExpiresIn: string;

  // cookie
  @IsNotEmpty()
  @Expose({ name: 'COOKIE_SECRET' })
  cookieSecret: string;
  @IsNotEmpty()
  @Expose({ name: 'COOKIE_EXPIRES_IN' })
  cookieExpiresIn: number;

  // cors
  @IsNotEmpty()
  @Expose({ name: 'WHITELISTED_DOMAINS' })
  @Transform(({ value }) => value.split(',').filter((v: string) => v !== ''))
  whitelistedDomains: string[];
}

export const registerConfig = registerAs(envConfigToken, (): Environment => {
  const envClass = plainToClass(Environment, process.env, {
    enableImplicitConversion: true,
    excludeExtraneousValues: true,
    exposeDefaultValues: true,
    exposeUnsetFields: true,
  });

  const errors = validateSync(envClass, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return envClass;
});

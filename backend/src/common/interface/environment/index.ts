export interface IEnvironment {
  port: number;
  nodeEnv: string;

  // Database
  mongoURI: string;

  // Database names
  userDb: string;
  categoriesDb: string;

  // jwt
  accessTokenSecret: string;
  refreshTokenSecret: string;
  accessTokenExpiresIn: string;
  refreshTokenExpiresIn: string;

  // cookie
  cookieSecret: string;
  cookieExpiresIn: number;

  // cors
  whitelistedDomains: string[];
}

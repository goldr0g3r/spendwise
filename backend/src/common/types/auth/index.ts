import { UUID } from 'crypto';

export type IPAddress = `${number}.${number}.${number}.${number}`;

export type JWTToken = `${string}.${string}.${string}`;

export interface IJwtTokens {
  accessToken: JWTToken;
  refreshToken: JWTToken;
}

export type JWTTokenPayload = {
  id: UUID;
  iat: number;
  exp: number;
  iss: string;
  username: string;
};

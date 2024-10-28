import { UUID } from 'crypto';
import { JWTToken } from 'src/common/types/auth';

export interface IUserSession {
  sessions: ISessionDevice[];
}

export interface ISessionDevice {
  deviceId: UUID;
  refreshToken?: JWTToken;
}

import { UUID } from 'crypto';
import { IJwtTokens } from 'src/common/types/auth';

export interface IUserResponse {
  id: UUID;
  email: string;
  username: string;
  name: string;
}

export interface IUserResponseWithTokens {
  user: IUserResponse;
  tokens: IJwtTokens;
}

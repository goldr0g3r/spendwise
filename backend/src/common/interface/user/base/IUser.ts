import { UUID } from 'crypto';

export interface IUser {
  id: UUID;
  name: string;
  username: string;
  email: string;
}

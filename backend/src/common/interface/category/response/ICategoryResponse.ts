import { UUID } from 'crypto';

export interface ICategoryResponse {
  id: UUID;
  name: string;
  icon?: string;
  color?: string;
  userId: UUID;
}

import { UUID } from 'crypto';

export interface ICategory {
  id: UUID;
  name: string;
  icon?: string;
  color?: string;
  userId: UUID;
}

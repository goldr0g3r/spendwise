import { UUID } from 'crypto';

export interface ICreateCategoryRequest {
  name: string;
  icon?: string;
  color?: string;
  userId: UUID;
}

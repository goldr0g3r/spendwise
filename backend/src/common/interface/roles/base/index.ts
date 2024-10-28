import { Roles } from 'src/common/types/roles';

export interface IRoleDetails {
  name: string;
  description: string;
  role_id: Roles;
  active: boolean;
}

export interface IRoleCategoryDetails {
  name: string;
  description: string;
  roles: IRoleDetails[];
}
export default interface IUserRoles {
  roles: Roles[];
}

import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import APIResponse, {
  IApiWithDataResponse,
} from 'src/common/dto/api/response/ApiResponse';
import IUserRoles, {
  IRoleCategoryDetails,
  IRoleDetails,
} from 'src/common/interface/roles/base';
import { DEFAULT_ROLES, Roles } from 'src/common/types/roles';

export class UserRolesResponse implements IUserRoles {
  @ApiProperty({
    title: 'User roles',
    description: 'The Roles of the user',
    type: [String],
    enum: Roles,
    example: DEFAULT_ROLES,
  })
  @Expose()
  roles: Roles[];
}

export class RoleDetailsResponse implements IRoleDetails {
  @ApiProperty({
    title: 'Name',
    description: 'Name of the role',
    example: 'Create Trip',
  })
  @Expose()
  name: string;

  @ApiProperty({
    title: 'Description',
    description: 'Description of the role',
    example: 'Create a trip',
  })
  @Expose()
  description: string;

  @ApiProperty({
    title: 'Role ID',
    description: 'Role ID',
    example: Roles.CREATE_CURRENCY,
    enum: Roles,
  })
  @Expose()
  role_id: Roles;

  @ApiProperty({
    title: 'Active',
    description: 'Is the role active for user',
    example: true,
  })
  @Expose()
  active: boolean;
}

export class RoleCategoryDetailsResponse implements IRoleCategoryDetails {
  @ApiProperty({
    title: 'Name',
    description: 'Name of the role category',
    example: 'Trip',
  })
  @Expose()
  name: string;

  @ApiProperty({
    title: 'Description',
    description: 'Description of the role category',
    example: 'Trip related roles',
  })
  @Expose()
  description: string;

  @ApiProperty({
    title: 'Roles',
    description: 'Roles in the category',
    type: [RoleDetailsResponse],
  })
  @Type(() => RoleDetailsResponse)
  @Expose()
  roles: RoleDetailsResponse[];
}

export class UserRolesApiResponse
  extends APIResponse
  implements IUserRoles, IApiWithDataResponse<IRoleCategoryDetails[]>
{
  @ApiProperty({
    title: 'User roles',
    description: 'The Roles of the user',
    type: [String],
    enum: Roles,
    example: DEFAULT_ROLES,
  })
  @Expose()
  roles: Roles[];

  @ApiProperty({
    title: 'Available Roles',
    description: 'Available roles for the user',
    type: [RoleCategoryDetailsResponse],
  })
  @Type(() => RoleCategoryDetailsResponse)
  @Expose()
  data: RoleCategoryDetailsResponse[];
}

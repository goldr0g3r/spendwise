import { Reflector } from '@nestjs/core';
import { Roles } from 'src/common/types/roles';

export const AllowRoles = Reflector.createDecorator<Roles[]>();

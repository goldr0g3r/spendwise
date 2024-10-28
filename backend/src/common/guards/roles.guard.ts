import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AllowRoles } from 'src/helpers/decorators/roles.decorator';
import { Roles } from '../types/roles';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const roles = this.reflector.get(AllowRoles, context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user || {
      roles: [],
    };

    const match = this.matchRoles(roles, user.roles);
    if (match) {
      return true;
    }

    throw new ForbiddenException(
      'You do not have permission to access this resource',
    );
  }

  private matchRoles(requiredRoles: Roles[], userRoles: Roles[]) {
    if (
      userRoles.includes(Roles.BANNED) ||
      userRoles.includes(Roles.SUSPENDED)
    ) {
      return false;
    }
    if (userRoles.includes(Roles.SUPER_USER)) {
      return true;
    }

    return requiredRoles.some((role) => userRoles.includes(role));
  }
}

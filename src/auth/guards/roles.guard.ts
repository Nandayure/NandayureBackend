import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../auth-roles/role.enum';
import { ROLES_KEY } from '../auth-roles/roles.decorator';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    // Check if the user has the required roles in the token
    const hasNeededRole = requiredRoles.some((role) =>
      user.roles?.includes(role),
    );

    if (!hasNeededRole) {
      return false;
    }

    // Check if the roles had changed in the database compared to the token
    const currentUser = await this.userService.findUserWithRoles(user.id);
    const currentUserRoles = currentUser.Roles.map((role) => role.RoleName);

    const hasRoleInDatabase = requiredRoles.some((role) =>
      currentUserRoles.includes(role),
    );

    if (!hasRoleInDatabase) {
      throw new HttpException('Sesión desactualizada.', 629);
    }

    return true;
  }
}

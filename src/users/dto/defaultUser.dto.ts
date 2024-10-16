import { Role } from 'src/roles/entities/role.entity';

export class DefaultUserDto {
  id: string;

  Password: string;

  Roles: Role[];
}

import { CreateRoleDto } from '../dto/create-role.dto';

export const defaultRoleData: CreateRoleDto[] = [
  {
    RoleName: 'USER',
    Description: 'Rol de usuario normal',
  },
  {
    RoleName: 'TI',
    Description: 'Rol de usuario de TI',
  },
  {
    RoleName: 'RH',
    Description: 'Rol de usuario de Recursos Humanos',
  },
  {
    RoleName: 'VA',
    Description: 'Rol de usuario Alcalde o Vicealcalde',
  },
];

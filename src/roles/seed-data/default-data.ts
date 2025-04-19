import { CreateRoleDto } from '../dto/create-role.dto';

export const defaultRoleData: CreateRoleDto[] = [
  {
    RoleName: 'USER',
    Description:
      'Rol base asignado a todos los usuarios del sistema. Permite acceso general a las funcionalidades básicas según su puesto.',
  },
  {
    RoleName: 'TI',
    Description:
      'Rol exclusivo para el Jefe del Departamento de Tecnologías de la Información (TI). Permite gestionar usuarios del sistema, asignar y remover roles, así como habilitar o inhabilitar cuentas.',
  },
  {
    RoleName: 'RH',
    Description:
      'Rol exclusivo para el Jefe del Departamento de Recursos Humanos (RH). Permite administrar información del personal y gestionar sus datos, sin acceso a la gestión de usuarios del sistema.',
  },
  {
    RoleName: 'VA',
    Description:
      'Rol reservado únicamente para el Alcalde y Vicealcalde. Otorga acceso completo al módulo de analíticas del sistema para la toma de decisiones estratégicas.',
  },
  {
    RoleName: 'DEPARTMENT_HEAD',
    Description:
      'Rol asignado únicamente a empleados que son jefes de algún departamento. Permite acceso al módulo de aprobación de solicitudes dentro de su respectivo departamento.',
  },
];

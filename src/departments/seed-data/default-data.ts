import { CreateDepartmentDto } from '../dto/create-department.dto';

export const defaultDepartmentData: CreateDepartmentDto[] = [
  // Departamentos del programa 1 (Administrativos)
  {
    name: 'ADMINISTRACIÓN',
    description: 'Departamento encargado de la administración general.',
    departmentProgramId: 1, // Tipo 1
    budgetCodeId: 1, //todos los de programa 1 tienen los mismo codigos
  },
  {
    name: 'FINANZAS',
    description: 'Departamento encargado de la gestión financiera.',
    departmentProgramId: 1, // Tipo 1
    budgetCodeId: 1,
  },
  {
    name: 'RECURSOS HUMANOS',
    description: 'Departamento encargado de la gestión del personal.',
    departmentProgramId: 1, // Tipo 1
    budgetCodeId: 1,
  },
  {
    name: 'PLANIFICACIÓN',
    description: 'Departamento encargado de la planificación estratégica.',
    departmentProgramId: 1, // Tipo 1
    budgetCodeId: 1,
  },
  {
    name: 'SECRETARÍA',
    description: 'Departamento de la secretaría municipal.',
    departmentProgramId: 1, // Tipo 1
    budgetCodeId: 1,
  },

  {
    // Departamentos del programa 2
    name: 'AMBIENTAL',
    description: 'Departamento encargado de la gestión ambiental.',
    departmentProgramId: 2, // Tipo 2
    budgetCodeId: 2,
  },
  {
    name: 'OPERARIOS',
    description: 'Departamento encargado de la gestión de operarios.',
    departmentProgramId: 2, // Tipo 2
    budgetCodeId: 3,
  },
  {
    name: 'CEMENTERIO',
    description: 'Departamento encargado del mantenimiento del cementerio.',
    departmentProgramId: 2, // Tipo 2
    budgetCodeId: 4,
  },
  {
    name: 'PARQUE',
    description: 'Departamento encargado del mantenimiento de parques.',
    departmentProgramId: 2, // Tipo 2
    budgetCodeId: 5,
  },
  {
    name: 'ACUEDUCTO',
    description: 'Departamento encargado de la gestión del acueducto.',
    departmentProgramId: 2, // Tipo 2
    budgetCodeId: 6,
  },
  {
    name: 'GESTIÓN SOCIAL',
    description: 'Departamento encargado de la gestión social.',
    departmentProgramId: 2, // Tipo 2
    budgetCodeId: 7,
  },
  {
    name: 'ZONA MARÍTIMO TERRESTRE',
    description: 'Departamento encargado de la zona marítimo terrestre.',
    departmentProgramId: 2, // Tipo 2
    budgetCodeId: 8,
  },
  {
    name: 'CONSERJE',
    description: 'Departamento de conserjes encargados de la limpieza.',
    departmentProgramId: 2, // Tipo 2
    budgetCodeId: 9,
  },
  {
    name: 'DESARROLLO URBANO',
    description: 'Departamento encargado del desarrollo urbano.',
    departmentProgramId: 2, // Tipo 2
    budgetCodeId: 10,
  },
  {
    name: 'UTGVM',
    description: 'Unidad Técnica de Gestión de Vialidad Municipal.',
    departmentProgramId: 2, // Tipo 2
    budgetCodeId: 11,
  },
  {
    name: 'OPERARIOS UTGVM',
    description: 'Departamento encargado de los operarios de la UTGVM.',
    departmentProgramId: 2, // Tipo 2
    budgetCodeId: 12,
  },
];

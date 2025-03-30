import { CreateJobPositionDto } from '../dto/create-job-position.dto';
export const defaultJobPositionsData: CreateJobPositionDto[] = [
  {
    Name: 'Alcalde',
    Description: 'Máxima autoridad y representante del municipio.',
    baseSalary: 4500.0,
    globalSalary: 5000.0,
    extrafees: 500.0,
    DepartmentId: 1,
  },
  {
    Name: 'Vice Alcalde',
    Description: 'Vice alcalde municipal.',
    baseSalary: 4500.0,
    globalSalary: 5000.0,
    extrafees: 500.0,
    DepartmentId: 1,
  },
  {
    Name: 'Adim de Recurso Humano',
    Description: 'Vice alcalde municipal.',
    baseSalary: 4500.0,
    globalSalary: 5000.0,
    extrafees: 500.0,
    DepartmentId: 3,
  },
  {
    Name: 'Secret. Mun',
    Description:
      'Persona encargada de las funciones administrativas y secretariales del municipio.',
    baseSalary: 3000.0,
    globalSalary: 3500.0,
    extrafees: 500.0,
    DepartmentId: 1, // Administración
  },
  {
    Name: 'Asist. Secret',
    Description:
      'Asistente del secretario, encargado de tareas administrativas y de soporte.',
    baseSalary: 2500.0,
    globalSalary: 3000.0,
    extrafees: 500.0,
    DepartmentId: 1,
  },
  {
    Name: 'Tesorera',
    Description: 'Responsable de la gestión financiera y contable.',
    baseSalary: 3200.0,
    globalSalary: 3700.0,
    extrafees: 500.0,
    DepartmentId: 2, // Finanzas
  },
  {
    Name: 'Asist. Tesorera',
    Description: 'Asistente en las tareas financieras y contables.',
    baseSalary: 2800.0,
    globalSalary: 3300.0,
    extrafees: 500.0,
    DepartmentId: 2,
  },
  {
    Name: 'Enc. Facturación',
    Description: 'Encargado de la facturación y control de cuentas.',
    baseSalary: 2900.0,
    globalSalary: 3400.0,
    extrafees: 500.0,
    DepartmentId: 2,
  },
  {
    Name: 'Cobros',
    Description: 'Responsable de la gestión de cobros y cuentas por cobrar.',
    baseSalary: 2700.0,
    globalSalary: 3200.0,
    extrafees: 500.0,
    DepartmentId: 2,
  },
  {
    Name: 'Ejec. Presupuestaria a.i.',
    Description: 'Ejecutivo encargado de la administración del presupuesto.',
    baseSalary: 3000.0,
    globalSalary: 3500.0,
    extrafees: 500.0,
    DepartmentId: 2,
  },
  {
    Name: 'Contadora',
    Description: 'Responsable de la contabilidad y gestión financiera.',
    baseSalary: 2800.0,
    globalSalary: 3300.0,
    extrafees: 500.0,
    DepartmentId: 2,
  },
  {
    Name: 'Asist. Conta',
    Description: 'Asistente en la contabilidad y tareas financieras.',
    baseSalary: 2400.0,
    globalSalary: 2900.0,
    extrafees: 500.0,
    DepartmentId: 2,
  },
  {
    Name: 'Inspector General',
    Description: 'Encargado de supervisar y asegurar la calidad del trabajo.',
    baseSalary: 3100.0,
    globalSalary: 3600.0,
    extrafees: 500.0,
    DepartmentId: 3, // Inspección
  },
  {
    Name: 'Inspect Pat',
    Description:
      'Inspector de patrimonio encargado de la evaluación y supervisión.',
    baseSalary: 3100.0,
    globalSalary: 3600.0,
    extrafees: 500.0,
    DepartmentId: 3,
  },
  {
    Name: 'Enc. Archivo',
    Description: 'Responsable de la gestión y organización de archivos.',
    baseSalary: 2300.0,
    globalSalary: 2800.0,
    extrafees: 500.0,
    DepartmentId: 4, // Archivo
  },
  {
    Name: 'Notificador',
    Description: 'Encargado de realizar notificaciones oficiales.',
    baseSalary: 2200.0,
    globalSalary: 2700.0,
    extrafees: 500.0,
    DepartmentId: 4,
  },
  {
    Name: 'Proveedor',
    Description: 'Encargado de gestionar y coordinar proveedores.',
    baseSalary: 2600.0,
    globalSalary: 3100.0,
    extrafees: 500.0,
    DepartmentId: 5, // Proveedores
  },
  {
    Name: 'Enc. Infor.',
    Description: 'Encargado de la información y comunicación interna.',
    baseSalary: 2500.0,
    globalSalary: 3000.0,
    extrafees: 500.0,
    DepartmentId: 5,
  },
  {
    Name: 'Pl. F. Serv.',
    Description: 'Persona encargada de la planificación de servicios.',
    baseSalary: 3000.0,
    globalSalary: 3500.0,
    extrafees: 500.0,
    DepartmentId: 6, // Planificación
  },
  {
    Name: 'Enc. Rec. Hum.',
    Description: 'Encargado de la gestión de recursos humanos.',
    baseSalary: 3400.0,
    globalSalary: 3900.0,
    extrafees: 500.0,
    DepartmentId: 7, // Recursos Humanos
  },
  {
    Name: 'Gest. Jurídica',
    Description: 'Encargado de gestionar asuntos jurídicos.',
    baseSalary: 3500.0,
    globalSalary: 4000.0,
    extrafees: 500.0,
    DepartmentId: 8, // Legal
  },
  {
    Name: 'Ing. G. Amb A.I.',
    Description: 'Ingeniero en gestión ambiental con enfoque en IA.',
    baseSalary: 3700.0,
    globalSalary: 4200.0,
    extrafees: 500.0,
    DepartmentId: 9, // Medio Ambiente
  },
  {
    Name: 'OP. MQ.',
    Description: 'Operador en el manejo de maquinaria.',
    baseSalary: 2900.0,
    globalSalary: 3400.0,
    extrafees: 500.0,
    DepartmentId: 10, // Operaciones
  },
  {
    Name: 'PARQUE',
    Description: 'Encargado de la gestión y mantenimiento de parques.',
    baseSalary: 2400.0,
    globalSalary: 2900.0,
    extrafees: 500.0,
    DepartmentId: 11, // Parques
  },
  {
    Name: 'Adm. Acueducto',
    Description: 'Administrador del sistema de acueducto.',
    baseSalary: 3200.0,
    globalSalary: 3700.0,
    extrafees: 500.0,
    DepartmentId: 12, // Acueducto
  },
  {
    Name: 'PEÓN ACU',
    Description: 'Trabajador encargado de labores manuales en el acueducto.',
    baseSalary: 2000.0,
    globalSalary: 2500.0,
    extrafees: 500.0,
    DepartmentId: 12,
  },
  {
    Name: 'OF. MUJER',
    Description: 'Oficina enfocada en asuntos de la mujer.',
    baseSalary: 2700.0,
    globalSalary: 3200.0,
    extrafees: 500.0,
    DepartmentId: 13, // Igualdad de Género
  },
  {
    Name: 'Enc. Z.M.T.',
    Description: 'Encargado de la zona marítima terrestre.',
    baseSalary: 3100.0,
    globalSalary: 3600.0,
    extrafees: 500.0,
    DepartmentId: 14, // Marítima
  },
  {
    Name: 'CEMENT',
    Description: 'Encargado de la gestión y mantenimiento de cementerios.',
    baseSalary: 2400.0,
    globalSalary: 2900.0,
    extrafees: 500.0,
    DepartmentId: 15, // Cementerios
  },
  {
    Name: 'EXTRAS',
    Description: 'Trabajador encargado de tareas adicionales o de apoyo.',
    baseSalary: 2000.0,
    globalSalary: 2500.0,
    extrafees: 500.0,
    DepartmentId: 16, // General
  },
  {
    Name: 'Asist. Alcaldía',
    Description: 'Asistente del alcalde encargado de apoyo administrativo.',
    baseSalary: 3000.0,
    globalSalary: 3500.0,
    extrafees: 500.0,
    DepartmentId: 1,
  },
  {
    Name: 'Serv. Espec',
    Description: 'Encargado de gestionar servicios especiales según demanda.',
    baseSalary: 3500.0,
    globalSalary: 4000.0,
    extrafees: 500.0,
    DepartmentId: 1,
  },
];

import { CreateFinancialInstitutionDto } from '../dto/create-financial-institution.dto';

export const defaultInstitutionData: CreateFinancialInstitutionDto[] = [
  {
    TypeFinancialInstitutionId: 2, // Cooperativa
    name: 'Coopeservidores',
    description: 'Cooperativa de servicios múltiples.',
    deductionPercentage: 2.2, // Si no se aplica deducción
  },
  {
    TypeFinancialInstitutionId: 2, // Cooperativa
    name: 'Coopealianza',
    description: 'Cooperativa de ahorro y crédito.',
    deductionPercentage: 1.5, // Si no se aplica deducción
  },
  {
    TypeFinancialInstitutionId: 2, // Cooperativa
    name: 'Servicoop',
    description: 'Cooperativa de servicios múltiples.',
    deductionPercentage: 5.8, // Si no se aplica deducción
  },
  {
    TypeFinancialInstitutionId: 2, // Cooperativa
    name: 'Coope-Ande',
    description: 'Cooperativa de ahorro y crédito.',
    deductionPercentage: 2.2, // Si no se aplica deducción
  },
  {
    TypeFinancialInstitutionId: 2, // Cooperativa
    name: 'ASEMUNA',
    description: 'Asociación de empleados municipales con un descuento del 5%.',
    deductionPercentage: 5,
  },
  {
    TypeFinancialInstitutionId: 2, // Cooperativa
    name: 'ASEMUNA',
    description: 'Asociación de empleados municipales.',
    deductionPercentage: 3,
  },
  {
    TypeFinancialInstitutionId: 2, // Cooperativa
    name: 'Pensión',
    description: 'Deducciones para fondos de pensión.',
    deductionPercentage: 4,
  },
  {
    TypeFinancialInstitutionId: 2, // Cooperativa
    name: 'Embargos',
    description: 'Deducciones por embargos judiciales.',
    deductionPercentage: 12.5,
  },
  {
    TypeFinancialInstitutionId: 2, // Cooperativa
    name: 'Funerales vida',
    description: 'Servicios funerarios.',
    deductionPercentage: 4.4,
  },
  {
    TypeFinancialInstitutionId: 2, // Cooperativa
    name: 'SITRAMUNA',
    description: 'Sindicato de trabajadores municipales.',
    deductionPercentage: 1,
  },
  {
    TypeFinancialInstitutionId: 2, // Cooperativa
    name: 'ANEP',
    description: 'Asociación Nacional de Empleados Públicos.',
    deductionPercentage: 5.8,
  },
  {
    TypeFinancialInstitutionId: 1, // Banco
    name: 'INS',
    description: 'Instituto Nacional de Seguros.',
    deductionPercentage: 4.6,
  },
];

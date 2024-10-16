import { CreateLaborCodeRegulationDto } from '../dto/create-labor-code-regulation.dto';

export const defaultLaborRegulationsData: CreateLaborCodeRegulationDto[] = [
  {
    minimumAmount: 0.0,
    maximumAmount: 929000.0,
    percentage: 0,
    description:
      'Salarios entre 0.0 y 929,000 colones - Exento de impuesto a la renta',
  },
  {
    minimumAmount: 929000.0,
    maximumAmount: 1363000.0,
    percentage: 10,
    description:
      'Salarios entre 929,000 y 1,363,000 colones - 10% de impuesto a la renta',
  },
  {
    minimumAmount: 1363000.0,
    maximumAmount: 2392000.0,
    percentage: 15,
    description:
      'Salarios entre 1,363,000 y 2,392,000 colones - 15% de impuesto a la renta',
  },
  {
    minimumAmount: 2392000.0,
    maximumAmount: 4783000.0,
    percentage: 20,
    description:
      'Salarios entre 2,392,000 y 4,783,000 colones - 20% de impuesto a la renta',
  },
  {
    minimumAmount: 4783000.0,
    maximumAmount: null, // Sin límite superior
    percentage: 25,
    description:
      'Salarios superiores a 4,783,000 colones - 25% de impuesto a la renta',
  },
];

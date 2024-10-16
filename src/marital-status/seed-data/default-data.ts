import { CreateMaritalStatusDto } from '../dto/create-marital-status.dto';

export const defaultMaritalStatusData: CreateMaritalStatusDto[] = [
  {
    Name: 'Soltero(@)',
    Description: 'Persona que no ha contraído matrimonio.',
  },
  {
    Name: 'Casado(@)',
    Description: 'Persona que ha contraído matrimonio.',
  },
  {
    Name: 'Divorciado(@)',
    Description: 'Persona que ha disuelto legalmente su matrimonio.',
  },
  {
    Name: 'Viudo(@)',
    Description: 'Persona cuyo cónyuge ha fallecido y no se ha vuelto a casar.',
  },
  {
    Name: 'Separado(@)',
    Description:
      'Persona que está separada de su cónyuge pero no legalmente divorciada.',
  },
  {
    Name: 'Unión Libre',
    Description:
      'Persona que vive en una relación de pareja estable y permanente sin haber contraído matrimonio legal.',
  },
  {
    Name: 'Comprometid(a)',
    Description:
      'Persona que ha aceptado una propuesta de matrimonio, pero aún no se ha casado.',
  },
];

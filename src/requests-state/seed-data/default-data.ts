import { CreateRequestsStateDto } from '../dto/create-requests-state.dto';

export const defaultRequestStateData: CreateRequestsStateDto[] = [
  { Name: 'En Proceso' },
  { Name: 'Aprobada' },
  { Name: 'Rechazada' },
];

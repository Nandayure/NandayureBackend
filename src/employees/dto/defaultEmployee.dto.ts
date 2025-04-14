import { Study } from 'src/studies/entities/study.entity';

export class defaultEmployee {
  id: string;

  Name: string;

  Surname1: string;

  Surname2: string;

  Birthdate: Date;

  HiringDate: Date;

  Email: string;

  CellPhone: string;

  NumberChlidren: number;

  AvailableVacationDays: number;

  MaritalStatusId?: number;

  GenderId?: number;

  JobPositionId?: number;

  EmbargoId?: number;

  Studies?: Study[];
}

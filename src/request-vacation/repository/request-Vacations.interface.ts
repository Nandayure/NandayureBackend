import { BaseInterfaceRepository } from 'src/core/generic-repository/interface/base.interface';
import { RequestVacation } from '../entities/request-vacation.entity';

export interface requestVacationsRepositoryInterface
  extends BaseInterfaceRepository<RequestVacation> {}

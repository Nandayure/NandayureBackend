import { BaseInterfaceRepository } from 'src/core/generic-repository/interface/base.interface';
import { RequestType } from '../entities/request-type.entity';

export interface RequestTypeRepositoryInterface
  extends BaseInterfaceRepository<RequestType> {}

import { BaseInterfaceRepository } from 'src/core/generic-repository/interface/base.interface';
import { Request } from '../entities/request.entity';

export interface RequestRepositoryInterface
  extends BaseInterfaceRepository<Request> {}

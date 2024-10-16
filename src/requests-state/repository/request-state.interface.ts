import { BaseInterfaceRepository } from 'src/core/generic-repository/interface/base.interface';

import { RequestsState } from '../entities/requests-state.entity';

export interface RequestStateRepositoryInterface
  extends BaseInterfaceRepository<RequestsState> {}

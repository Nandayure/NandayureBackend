import { BaseInterfaceRepository } from 'src/core/generic-repository/interface/base.interface';
import { RequestApproval } from '../entities/request-approval.entity';

export interface RequestApprovalRepositoryInterface
  extends BaseInterfaceRepository<RequestApproval> {}

import { BaseInterfaceRepository } from 'src/core/generic-repository/interface/base.interface';
import { PayrollDetail } from '../entities/payroll-detail.entity';

export interface PayrollDetailRepositoryInterface
  extends BaseInterfaceRepository<PayrollDetail> {}

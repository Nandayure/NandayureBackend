import { BaseInterfaceRepository } from 'src/core/generic-repository/interface/base.interface';
import { Payroll } from '../entities/payroll.entity';

export interface PayrollRepositoryInterface
  extends BaseInterfaceRepository<Payroll> {}

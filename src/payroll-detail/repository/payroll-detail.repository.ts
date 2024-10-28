import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { PayrollDetail } from '../entities/payroll-detail.entity';
import { BaseAbstractRepostitory } from 'src/core/generic-repository/repository/base.repository';
import { PayrollDetailRepositoryInterface } from './payroll-detail.interface';

export class PayrollDetailRepository
  extends BaseAbstractRepostitory<PayrollDetail>
  implements PayrollDetailRepositoryInterface
{
  constructor(
    @InjectRepository(PayrollDetail)
    private readonly payrollDetailGenericRepository: Repository<PayrollDetail>,
  ) {
    super(payrollDetailGenericRepository);
  }
}

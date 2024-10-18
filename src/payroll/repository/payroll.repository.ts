import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Payroll } from '../entities/payroll.entity';
import { BaseAbstractRepostitory } from 'src/core/generic-repository/repository/base.repository';
import { PayrollRepositoryInterface } from './payroll.interface';

export class PayrollRepository
  extends BaseAbstractRepostitory<Payroll>
  implements PayrollRepositoryInterface
{
  constructor(
    @InjectRepository(Payroll)
    private readonly payrollGenericRepository: Repository<Payroll>,
  ) {
    super(payrollGenericRepository);
  }
}

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseAbstractRepostitory } from 'src/core/generic-repository/repository/base.repository';
import { BudgetCode } from '../entities/budget-code.entity';
import { BudgetCodeRepositoryInterface } from './BudgetCode.interface';

export class BudgetCodeRepository
  extends BaseAbstractRepostitory<BudgetCode>
  implements BudgetCodeRepositoryInterface
{
  constructor(
    @InjectRepository(BudgetCode)
    private readonly budgetRepository: Repository<BudgetCode>,
  ) {
    super(budgetRepository);
  }
}

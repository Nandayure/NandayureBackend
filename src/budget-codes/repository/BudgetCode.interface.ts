import { BaseAbstractRepostitory } from 'src/core/generic-repository/repository/base.repository';
import { BudgetCode } from '../entities/budget-code.entity';

export interface BudgetCodeRepositoryInterface
  extends BaseAbstractRepostitory<BudgetCode> {}

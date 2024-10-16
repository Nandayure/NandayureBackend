import { BaseAbstractRepostitory } from 'src/core/generic-repository/repository/base.repository';
import { FinancialInstitution } from '../entities/financial-institution.entity';
export interface FinancialInstitutionInterface
  extends BaseAbstractRepostitory<FinancialInstitution> {}

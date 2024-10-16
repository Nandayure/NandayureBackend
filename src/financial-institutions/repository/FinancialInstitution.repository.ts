import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FinancialInstitution } from '../entities/financial-institution.entity';
import { BaseAbstractRepostitory } from 'src/core/generic-repository/repository/base.repository';
import { FinancialInstitutionInterface } from './FinancialInstitution.interface';

export class FinancialInstitutionRepository
  extends BaseAbstractRepostitory<FinancialInstitution>
  implements FinancialInstitutionInterface
{
  constructor(
    @InjectRepository(FinancialInstitution)
    private readonly financialInstitutionRepository: Repository<FinancialInstitution>,
  ) {
    super(financialInstitutionRepository);
  }
}

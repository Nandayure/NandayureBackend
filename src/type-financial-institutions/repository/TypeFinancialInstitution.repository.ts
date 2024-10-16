import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeFinancialInstitution } from '../entities/type-financial-institution.entity';
import { BaseAbstractRepostitory } from 'src/core/generic-repository/repository/base.repository';
import { TypeFinancialInstitutionInterface } from './TypeFinancialInstitution.interface';

export class TypeFinancialInstitutionRepository
  extends BaseAbstractRepostitory<TypeFinancialInstitution>
  implements TypeFinancialInstitutionInterface
{
  constructor(
    @InjectRepository(TypeFinancialInstitution)
    private readonly typeFinantialInstitutionRepository: Repository<TypeFinancialInstitution>,
  ) {
    super(typeFinantialInstitutionRepository);
  }
}

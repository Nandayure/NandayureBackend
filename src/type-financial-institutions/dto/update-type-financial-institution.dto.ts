import { PartialType } from '@nestjs/swagger';
import { CreateTypeFinancialInstitutionDto } from './create-type-financial-institution.dto';

export class UpdateTypeFinancialInstitutionDto extends PartialType(
  CreateTypeFinancialInstitutionDto,
) {}

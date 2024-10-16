import { PartialType } from '@nestjs/swagger';
import { CreateLaborCodeRegulationDto } from './create-labor-code-regulation.dto';

export class UpdateLaborCodeRegulationDto extends PartialType(
  CreateLaborCodeRegulationDto,
) {}

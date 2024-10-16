import { PartialType } from '@nestjs/swagger';
import { CreateRequestVacationDto } from './create-request-vacation.dto';

export class UpdateRequestVacationDto extends PartialType(
  CreateRequestVacationDto,
) {}

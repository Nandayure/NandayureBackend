import { PartialType } from '@nestjs/swagger';
import { CreateDepartmentProgramDto } from './create-department-program.dto';

export class UpdateDepartmentProgramDto extends PartialType(
  CreateDepartmentProgramDto,
) {}

import { PartialType } from '@nestjs/swagger';
import { CreateEmployeeProcedureDto } from './create-employee-procedure.dto';

export class UpdateEmployeeProcedureDto extends PartialType(CreateEmployeeProcedureDto) {}

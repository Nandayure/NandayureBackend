import { PartialType } from '@nestjs/swagger';
import { CreateEmployeesStateDto } from './create-employees-state.dto';

export class UpdateEmployeesStateDto extends PartialType(CreateEmployeesStateDto) {}

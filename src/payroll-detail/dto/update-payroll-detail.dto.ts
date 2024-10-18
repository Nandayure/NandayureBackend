import { PartialType } from '@nestjs/swagger';
import { CreatePayrollDetailDto } from './create-payroll-detail.dto';

export class UpdatePayrollDetailDto extends PartialType(CreatePayrollDetailDto) {}

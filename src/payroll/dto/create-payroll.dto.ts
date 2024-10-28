import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty } from 'class-validator';

export class CreatePayrollDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  Startperiod: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  EndPeriod: Date;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOvertimeDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  Date: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  Hours: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  EmployeeId: string;
}

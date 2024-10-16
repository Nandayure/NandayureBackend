import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateBudgetCodeDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  CodSalary?: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsNumber()
  CodExtra?: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsNumber()
  CodAnuity?: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsNumber()
  CodSalaryPlus?: string;
}

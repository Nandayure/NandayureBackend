import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBudgetCodeDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  CodSalary?: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  CodExtra?: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  CodAnuity?: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  CodSalaryPlus?: string;
}

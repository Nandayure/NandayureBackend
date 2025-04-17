import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator';
import { CreateEmployeeDto } from './create-employee.dto';

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  Name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  Surname1?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  Surname2?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  Birthdate?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  HiringDate?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  Email?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  CellPhone?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  NumberChlidren?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  MaritalStatusId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  GenderId?: number;
}

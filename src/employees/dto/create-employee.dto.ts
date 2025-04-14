import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsEmail,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class CreateEmployeeDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  Name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  Surname1: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  Surname2: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  Birthdate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  HiringDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  Email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  CellPhone: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  NumberChlidren: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  AvailableVacationDays: number;

  @ApiProperty()
  @IsInt()
  MaritalStatusId?: number;

  @ApiProperty()
  @IsInt()
  GenderId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  JobPositionId?: number;
}

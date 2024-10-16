import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateLaborCodeRegulationDto {
  @ApiProperty()
  @IsDecimal()
  minimumAmount: number;

  @ApiProperty()
  @IsDecimal()
  maximumAmount?: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  percentage: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;
}

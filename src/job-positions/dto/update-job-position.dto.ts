import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { CreateJobPositionDto } from './create-job-position.dto';

export class UpdateJobPositionDto extends PartialType(CreateJobPositionDto) {
  @ApiPropertyOptional()
  @IsString()
  Name: string;

  @ApiPropertyOptional()
  @IsString()
  Description: string;

  @ApiPropertyOptional()
  @IsNumber()
  baseSalary: number;

  @ApiPropertyOptional()
  @IsNumber()
  globalSalary: number;

  @ApiPropertyOptional()
  @IsNumber()
  extrafees: number;
}

import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateAnnuityDto } from './create-annuity.dto';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateAnnuityDto extends PartialType(CreateAnnuityDto) {
  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsDateString()
  Date?: Date;

  @ApiPropertyOptional()
  @IsString()
  @MaxLength(255)
  Description?: string;

  @ApiPropertyOptional()
  @IsNumber()
  Amount?: number;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsNumber()
  EmployeeId: string;
}

import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateAnnuityDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  Date: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  Description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  EmployeeId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  Amount: number;
}

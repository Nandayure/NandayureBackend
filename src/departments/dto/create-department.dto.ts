import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDepartmentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  departmentProgramId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  budgetCodeId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  departmentHeadId?: string;
}

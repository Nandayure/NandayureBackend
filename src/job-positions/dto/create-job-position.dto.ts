import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateJobPositionDto {
  @ApiProperty({
    example: 'Software Engineer',
  })
  @IsString()
  Name: string;

  @ApiProperty({
    example: 'Responsable del desarrollo de aplicaciones web.',
  })
  @IsString()
  Description: string;

  @ApiProperty({
    example: 50000.0,
    type: 'number',
    format: 'decimal',
  })
  @IsNumber()
  baseSalary: number;

  @ApiProperty({
    example: 55000.0,
    type: 'number',
    format: 'decimal',
  })
  @IsNumber()
  globalSalary: number;

  @ApiProperty({
    description: 'Tarifa extra o compensación por horas adicionales',
    example: 200.0,
    type: 'number',
    format: 'decimal',
  })
  @IsNumber()
  extrafees: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  DepartmentId: number;
}

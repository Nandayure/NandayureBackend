import { IsString, IsBoolean, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateHolidayDto } from './create-holiday.dto';

export class UpdateHolidayDto extends PartialType(CreateHolidayDto) {
  @ApiProperty({ description: 'Nombre del día feriado', example: 'Día de la Independencia', required: false })
  @IsOptional()
  @IsString({ message: 'El nombre debe ser un texto' })
  name?: string;

  @ApiProperty({ description: 'Fecha del día feriado', example: '2025-01-01', required: false })
  @IsOptional()
  @IsDateString()
  date?: string;

  @ApiProperty({ description: '¿El día feriado está activo?', example: true, required: false })
  @IsOptional()
  @IsBoolean({ message: 'isActive debe ser un valor booleano' })
  isActive?: boolean;

  @ApiProperty({ description: '¿El día feriado se repite anualmente?', example: false, required: false })
  @IsOptional()
  @IsBoolean({ message: 'isRecurringYearly debe ser un valor booleano' })
  isRecurringYearly?: boolean;
}
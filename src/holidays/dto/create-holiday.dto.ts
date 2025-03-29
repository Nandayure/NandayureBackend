import { IsNotEmpty, IsString, IsBoolean, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHolidayDto {
  @ApiProperty({ description: 'Nombre del día feriado', example: 'Día de la Independencia' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  @IsString({ message: 'El nombre debe ser un texto' })
  name: string;

  @ApiProperty({ description: 'Fecha del día feriado', example: '2025-01-01' })
  @IsNotEmpty({ message: 'La fecha no puede estar vacía' })
  @IsDateString({}, { message: 'Formato de fecha inválido' })
  date: string;

  @ApiProperty({ description: '¿El día feriado está activo?', example: true, default: true })
  @IsOptional()
  @IsBoolean({ message: 'isActive debe ser un valor booleano' })
  isActive?: boolean;

  @ApiProperty({ description: '¿El día feriado se repite anualmente?', example: false, default: false })
  @IsOptional()
  @IsBoolean({ message: 'isRecurringYearly debe ser un valor booleano' })
  isRecurringYearly?: boolean;
}
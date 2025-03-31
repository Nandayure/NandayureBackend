import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsOptional,
  IsDateString,
  ValidateIf,
  IsInt,
  Min,
  Max,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHolidayDto {
  @ApiProperty({
    description: 'Nombre del día feriado',
    example: 'Día de la Independencia',
  })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  @IsString({ message: 'El nombre debe ser un texto' })
  name: string;

  @ApiProperty({ description: 'Fecha del día feriado', example: '2025-01-01' })
  @ValidateIf((o) => !o.isRecurringYearly)
  @IsNotEmpty({ message: 'La fecha no puede estar vacía' })
  @IsDateString({}, { message: 'Formato de fecha inválido' })
  specificDate: string;

  @ApiProperty({ description: 'Mes de feriado recurrente', example: '5' })
  @ValidateIf((o) => o.isRecurringYearly)
  @IsInt()
  @Min(1)
  @Max(12)
  recurringMonth?: number;

  @ApiProperty({ description: 'Día de feriado recurrente', example: '1' })
  @ValidateIf((o) => o.isRecurringYearly)
  @IsInt()
  @Min(1)
  @Max(31)
  recurringDay?: number;

  @ApiProperty({
    description: '¿El día feriado se repite anualmente?',
    example: false,
    default: false,
  })
  @IsBoolean({ message: 'isRecurringYearly debe ser un valor booleano' })
  isRecurringYearly: boolean;

  // @ApiProperty({
  //   description: '¿El día feriado está activo?',
  //   example: true,
  //   default: true,
  // })
  @IsOptional()
  @IsBoolean({ message: 'isActive debe ser un valor booleano' })
  isActive?: boolean;
}

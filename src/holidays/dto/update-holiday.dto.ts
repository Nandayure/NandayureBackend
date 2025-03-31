import {
  IsString,
  IsBoolean,
  IsOptional,
  IsDateString,
  ValidateIf,
  IsInt,
  Min,
  Max,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateHolidayDto } from './create-holiday.dto';

export class UpdateHolidayDto extends PartialType(CreateHolidayDto) {
  @ApiProperty({
    description: 'Nombre del día feriado',
    example: 'Día de la Independencia',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'El nombre debe ser un texto' })
  name?: string;

  @ApiProperty({
    description: 'Fecha del día feriado (solo si no se repite anualmente)',
    example: '2025-01-01',
    required: false,
  })
  @ValidateIf(
    (o) => o.isRecurringYearly === false || o.isRecurringYearly === undefined,
  )
  @IsOptional()
  @IsDateString({}, { message: 'Formato de fecha inválido' })
  specificDate?: string;

  @ApiProperty({
    description:
      'Mes del día feriado recurrente (solo si se repite anualmente)',
    example: 5,
    required: false,
  })
  @ValidateIf((o) => o.isRecurringYearly)
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(12)
  recurringMonth?: number;

  @ApiProperty({
    description:
      'Día del mes del día feriado recurrente (solo si se repite anualmente)',
    example: 1,
    required: false,
  })
  @ValidateIf((o) => o.isRecurringYearly)
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(31)
  recurringDay?: number;

  @ApiProperty({
    description: '¿El día feriado está activo?',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'isActive debe ser un valor booleano' })
  isActive?: boolean;

  @ApiProperty({
    description: '¿El día feriado se repite anualmente?',
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'isRecurringYearly debe ser un valor booleano' })
  isRecurringYearly?: boolean;
}

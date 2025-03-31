import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty } from 'class-validator';

export class CreateRequestVacationDto {
  // @ApiProperty()
  // @IsInt()
  // @IsNotEmpty()
  // daysRequested: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  departureDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  entryDate: Date;

  RequestId?: number;
}

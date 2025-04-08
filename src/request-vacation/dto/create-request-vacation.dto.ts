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
  entryDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  departureDate: Date;

  RequestId?: number;
}

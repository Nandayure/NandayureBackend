import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsDateString } from 'class-validator';

export class GetAvailableDaysDto {
  @IsNotEmpty()
  @IsDateString()
  @ApiProperty()
  startDate: Date;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty()
  endDate: Date;
}

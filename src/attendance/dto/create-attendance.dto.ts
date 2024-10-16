import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateAttendanceDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  Date: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
    message: 'El formato debe ser hh:mm:ss',
  })
  ArrivalTime: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
    message: 'El formato debe ser hh:mm:ss',
  })
  lunchBreakStart: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
    message: 'El formato debe ser hh:mm:ss',
  })
  lunchBreakEnd: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
    message: 'El formato debe ser hh:mm:ss',
  })
  departureTime: string;

  @ApiProperty()
  @IsNotEmpty()
  employeeId: string;
}

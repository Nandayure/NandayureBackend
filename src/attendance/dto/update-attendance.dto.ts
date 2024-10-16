import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAttendanceDto } from './create-attendance.dto';
import { IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

export class UpdateAttendanceDto extends PartialType(CreateAttendanceDto) {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
    message: 'El formato debe ser hh:mm:ss',
  })
  ArrivalTime?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
    message: 'El formato debe ser hh:mm:ss',
  })
  lunchBreakStart?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
    message: 'El formato debe ser hh:mm:ss',
  })
  lunchBreakEnd?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
    message: 'El formato debe ser hh:mm:ss',
  })
  departureTime?: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  employeeId?: string;
}

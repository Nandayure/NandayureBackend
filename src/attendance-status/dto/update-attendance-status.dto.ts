import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateAttendanceStatusDto } from './create-attendance-status.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateAttendanceStatusDto extends PartialType(
  CreateAttendanceStatusDto,
) {
  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  Name: string;
}

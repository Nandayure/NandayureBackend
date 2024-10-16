import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAttendanceStatusDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  Name: string;
}

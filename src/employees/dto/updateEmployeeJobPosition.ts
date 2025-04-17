import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class UpdateEmployeeJobPosition {
  @ApiProperty()
  @IsInt()
  JobPositionId: number;
}

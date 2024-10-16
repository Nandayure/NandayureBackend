import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  EmployeeId: string;
}

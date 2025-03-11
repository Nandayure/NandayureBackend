import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetTopEmployeesWithMostRequestsDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  limit: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  month: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  year: number;
}

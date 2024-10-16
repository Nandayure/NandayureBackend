import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdateDto {
  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  EmployeeId: string;

  @IsOptional()
  @ApiProperty()
  @IsNotEmpty()
  Password: string;
}

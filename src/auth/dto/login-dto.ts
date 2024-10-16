import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsOptional()
  csrfToken: string;

  @ApiProperty()
  @Transform(({ value }) => parseInt(value, 10))
  @IsNotEmpty()
  @IsNumber()
  EmployeeId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  Password: string;
}

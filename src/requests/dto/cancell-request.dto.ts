import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CancelRequestDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  CancelledReason: string;
}

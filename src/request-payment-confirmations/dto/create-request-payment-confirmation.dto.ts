import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateRequestPaymentConfirmationDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  reason?: string;

  RequestId?: number;
}

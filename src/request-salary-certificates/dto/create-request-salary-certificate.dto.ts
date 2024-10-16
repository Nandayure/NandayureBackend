import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateRequestSalaryCertificateDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  reason?: string;

  RequestId?: number;
}

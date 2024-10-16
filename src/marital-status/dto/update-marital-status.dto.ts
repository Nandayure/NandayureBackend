import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateMaritalStatusDto } from './create-marital-status.dto';

export class UpdateMaritalStatusDto extends PartialType(
  CreateMaritalStatusDto,
) {
  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  Name: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  Description: string;
}

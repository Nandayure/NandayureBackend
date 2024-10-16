import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateRequestsStateDto } from './create-requests-state.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateRequestsStateDto extends PartialType(
  CreateRequestsStateDto,
) {
  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  Name: string;
}

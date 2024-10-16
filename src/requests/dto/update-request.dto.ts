import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateRequestDto } from './create-request.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateRequestDto extends PartialType(CreateRequestDto) {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  requestStatusId: number;
}

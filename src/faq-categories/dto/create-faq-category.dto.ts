import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateFaqCategoryDto {
  @ApiProperty()
  @IsString()
  name: string;
}

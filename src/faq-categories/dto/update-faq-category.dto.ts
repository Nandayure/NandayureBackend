import { PartialType } from '@nestjs/mapped-types';
import { CreateFaqCategoryDto } from './create-faq-category.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateFaqCategoryDto extends PartialType(CreateFaqCategoryDto) {
  @ApiProperty()
  @IsString()
  name: string;
}

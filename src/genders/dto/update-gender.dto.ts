import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateGenderDto } from './create-gender.dto';

export class UpdateGenderDto extends PartialType(CreateGenderDto) {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  Name: string;
}

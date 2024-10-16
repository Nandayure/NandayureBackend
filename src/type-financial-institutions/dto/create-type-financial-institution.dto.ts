import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTypeFinancialInstitutionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
}

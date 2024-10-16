import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDepartmentProgramDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
}

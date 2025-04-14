import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateJobPositionDto {
  @ApiProperty({
    example: 'Software Engineer',
  })
  @IsString()
  Name: string;

  @ApiProperty({
    example: 'Responsable del desarrollo de aplicaciones web.',
  })
  @IsString()
  Description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  DepartmentId: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateDepartmentHeadDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  departmentHeadId?: string;
}

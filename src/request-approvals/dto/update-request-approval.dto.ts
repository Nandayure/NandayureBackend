import { ApiProperty } from '@nestjs/swagger';

import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class UpdateRequestApprovalDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  approved: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  observation?: string;
}

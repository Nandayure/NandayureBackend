import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGoogleDriveFileDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  FolderId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  FileName: string;

  // @ApiProperty()
  // @IsNotEmpty()
  // @IsString()
  // EmloyeeId: string;
}

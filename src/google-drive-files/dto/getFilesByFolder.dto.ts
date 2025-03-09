import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetFilesByFolderDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  folderId: string;

  // @ApiProperty()
  // @IsNotEmpty()
  // @IsString()
  // userId: string;
}

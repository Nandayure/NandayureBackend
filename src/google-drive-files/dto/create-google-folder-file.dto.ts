import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGoogleDriveFolderDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  folderName: string;
}

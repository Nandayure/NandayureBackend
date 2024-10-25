import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGoogleDriveFileDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  folderName: string;
}

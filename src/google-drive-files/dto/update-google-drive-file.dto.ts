import { PartialType } from '@nestjs/swagger';
import { CreateGoogleDriveFileDto } from './create-google-drive-file.dto';

export class UpdateGoogleDriveFileDto extends PartialType(CreateGoogleDriveFileDto) {}

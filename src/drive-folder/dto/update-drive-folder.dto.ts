import { PartialType } from '@nestjs/swagger';
import { CreateDriveFolderDto } from './create-drive-folder.dto';

export class UpdateDriveFolderDto extends PartialType(CreateDriveFolderDto) {}

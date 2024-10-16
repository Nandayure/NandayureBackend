import { PartialType } from '@nestjs/swagger';
import { CreateRequestTypeDto } from './create-request-type.dto';

export class UpdateRequestTypeDto extends PartialType(CreateRequestTypeDto) {}

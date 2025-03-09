import { PartialType } from '@nestjs/swagger';
import { CreateAnaliticDto } from './create-analitic.dto';

export class UpdateAnaliticDto extends PartialType(CreateAnaliticDto) {}

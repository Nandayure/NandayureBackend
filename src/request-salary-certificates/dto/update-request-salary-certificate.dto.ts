import { PartialType } from '@nestjs/swagger';
import { CreateRequestSalaryCertificateDto } from './create-request-salary-certificate.dto';

export class UpdateRequestSalaryCertificateDto extends PartialType(
  CreateRequestSalaryCertificateDto,
) {}

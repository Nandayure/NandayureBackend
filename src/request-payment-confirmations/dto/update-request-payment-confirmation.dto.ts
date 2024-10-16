import { PartialType } from '@nestjs/swagger';
import { CreateRequestPaymentConfirmationDto } from './create-request-payment-confirmation.dto';

export class UpdateRequestPaymentConfirmationDto extends PartialType(
  CreateRequestPaymentConfirmationDto,
) {}

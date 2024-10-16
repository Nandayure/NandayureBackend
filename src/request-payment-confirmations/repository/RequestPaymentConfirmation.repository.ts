import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RequestPaymentConfirmation } from '../entities/request-payment-confirmation.entity';
import { BaseAbstractRepostitory } from 'src/core/generic-repository/repository/base.repository';
import { RequestPaymentConfirmationRepositoryInterface } from './RequestPaymentConfirmation.interface';

export class RequestPaymentConfirmationRepository
  extends BaseAbstractRepostitory<RequestPaymentConfirmation>
  implements RequestPaymentConfirmationRepositoryInterface
{
  constructor(
    @InjectRepository(RequestPaymentConfirmation)
    private readonly requestSalaryCertificateGenericRepository: Repository<RequestPaymentConfirmation>,
  ) {
    super(requestSalaryCertificateGenericRepository);
  }
}

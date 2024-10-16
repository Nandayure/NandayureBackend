import { BaseInterfaceRepository } from 'src/core/generic-repository/interface/base.interface';
import { RequestPaymentConfirmation } from '../entities/request-payment-confirmation.entity';

export interface RequestPaymentConfirmationRepositoryInterface
  extends BaseInterfaceRepository<RequestPaymentConfirmation> {}

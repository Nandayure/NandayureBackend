import { Expose } from 'class-transformer';

import { RequestStatusDto } from './RequestStatusDto';
import { RequestTypeDto } from './RequestTypeDto';
export class RequestsSummaryDto {
  @Expose()
  vacationRequests: RequestTypeDto;

  @Expose()
  salaryCertificateRequests: RequestTypeDto;

  @Expose()
  paymentConfirmationRequests: RequestTypeDto;

  @Expose()
  totalApproved: RequestStatusDto;

  @Expose()
  totalRejected: RequestStatusDto;

  @Expose()
  totalPending: RequestStatusDto;

  @Expose()
  totalRequests: number;

  @Expose()
  lastUpdated: Date;
}

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RequestApproval } from '../entities/request-approval.entity';
import { BaseAbstractRepostitory } from 'src/core/generic-repository/repository/base.repository';
import { RequestApprovalRepositoryInterface } from './request-approvals.interface';

export class RequestApprovalRepository
  extends BaseAbstractRepostitory<RequestApproval>
  implements RequestApprovalRepositoryInterface
{
  constructor(
    @InjectRepository(RequestApproval)
    private readonly requestApprovalGenericRepository: Repository<RequestApproval>,
  ) {
    super(requestApprovalGenericRepository);
  }

  async findCurrentRequestToApproveWithoutCancelled(approverId: string) {
    return await this.requestApprovalGenericRepository
      .createQueryBuilder('approval')
      .innerJoinAndSelect('approval.Request', 'request')
      .leftJoinAndSelect('request.RequestType', 'requestType')
      .leftJoinAndSelect(
        'request.RequestSalaryCertificate',
        'salaryCertificate',
      )
      .leftJoinAndSelect(
        'request.RequestPaymentConfirmation',
        'paymentConfirmation',
      )
      .leftJoinAndSelect('request.RequestVacation', 'vacation')
      .leftJoinAndSelect('request.Employee', 'employee')
      .where('approval.approverId = :approverId', { approverId })
      .andWhere('approval.approved IS NULL')
      .andWhere('approval.current = true')
      .andWhere('request.RequestStatus != :excludedState', {
        excludedState: 4,
      })
      .getMany();
  }
}

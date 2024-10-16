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
}

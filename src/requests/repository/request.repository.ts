import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from '../entities/request.entity';
import { BaseAbstractRepostitory } from 'src/core/generic-repository/repository/base.repository';
import { RequestRepositoryInterface } from './request.interface';

export class RequestRepository
  extends BaseAbstractRepostitory<Request>
  implements RequestRepositoryInterface
{
  constructor(
    @InjectRepository(Request)
    private readonly requestGenericRepository: Repository<Request>,
  ) {
    super(requestGenericRepository);
  }

  async getTotalRequests() {
    return await this.requestGenericRepository.count();
  }

  async getRequestTypeCounts() {
    return await this.requestGenericRepository
      .createQueryBuilder('request')
      .select('request.RequestTypeId', 'typeId')
      .addSelect('COUNT(request.id)', 'total')
      .groupBy('request.RequestTypeId')
      .getRawMany();
  }

  async getRequestStatusCounts() {
    return await this.requestGenericRepository
      .createQueryBuilder('request')
      .select('request.RequestStateId', 'statusId')
      .addSelect('COUNT(request.id)', 'total')
      .groupBy('request.RequestStateId')
      .getRawMany();
  }
}

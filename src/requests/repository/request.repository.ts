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
}

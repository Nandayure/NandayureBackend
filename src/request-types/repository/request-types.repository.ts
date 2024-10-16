import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RequestType } from '../entities/request-type.entity';
import { BaseAbstractRepostitory } from 'src/core/generic-repository/repository/base.repository';
import { RequestTypeRepositoryInterface } from './request-types.interface';

export class RequestTypeRepository
  extends BaseAbstractRepostitory<RequestType>
  implements RequestTypeRepositoryInterface
{
  constructor(
    @InjectRepository(RequestType)
    private readonly requestTypeGenericRepository: Repository<RequestType>,
  ) {
    super(requestTypeGenericRepository);
  }
}

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RequestsState } from '../entities/requests-state.entity';
import { BaseAbstractRepostitory } from 'src/core/generic-repository/repository/base.repository';
import { RequestStateRepositoryInterface } from './request-state.interface';

export class RequestStateRepository
  extends BaseAbstractRepostitory<RequestsState>
  implements RequestStateRepositoryInterface
{
  constructor(
    @InjectRepository(RequestsState)
    private readonly requestStateRepository: Repository<RequestsState>,
  ) {
    super(requestStateRepository);
  }
}

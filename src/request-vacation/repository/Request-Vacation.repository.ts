import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RequestVacation } from '../entities/request-vacation.entity';
import { BaseAbstractRepostitory } from 'src/core/generic-repository/repository/base.repository';
import { RequestVacationRepositoryInterface } from './request-vacation.interface';

export class RequestVacationRepository
  extends BaseAbstractRepostitory<RequestVacation>
  implements RequestVacationRepositoryInterface
{
  constructor(
    @InjectRepository(RequestVacation)
    private readonly requestVacationGenericRepository: Repository<RequestVacation>,
  ) {
    super(requestVacationGenericRepository);
  }
}

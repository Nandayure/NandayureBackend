import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RequestVacation } from '../entities/request-vacation.entity';
import { BaseAbstractRepostitory } from 'src/core/generic-repository/repository/base.repository';
import { requestVacationsRepositoryInterface } from './request-Vacations.interface';

export class requestVacationRepository
  extends BaseAbstractRepostitory<RequestVacation>
  implements requestVacationsRepositoryInterface
{
  constructor(
    @InjectRepository(RequestVacation)
    private readonly requestVacationGenericRepository: Repository<RequestVacation>,
  ) {
    super(requestVacationGenericRepository);
  }
}

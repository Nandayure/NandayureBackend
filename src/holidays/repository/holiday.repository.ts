import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Holiday } from '../entities/holiday.entity';
import { BaseAbstractRepostitory } from 'src/core/generic-repository/repository/base.repository';
import { HolidayRepositoryInterface } from './holiday.interface';

export class HolidayRepository
  extends BaseAbstractRepostitory<Holiday>
  implements HolidayRepositoryInterface
{
  constructor(
    @InjectRepository(Holiday)
    private readonly holidayGenericRepository: Repository<Holiday>,
  ) {
    super(holidayGenericRepository);
  }
}

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LaborCodeRegulation } from '../entities/labor-code-regulation.entity';
import { BaseAbstractRepostitory } from 'src/core/generic-repository/repository/base.repository';
import { LaborCodeRegulationRepositoryInterface } from './LaborCodeRegulation.interface';

export class LaborCodeRegulationRepository
  extends BaseAbstractRepostitory<LaborCodeRegulation>
  implements LaborCodeRegulationRepositoryInterface
{
  constructor(
    @InjectRepository(LaborCodeRegulation)
    private readonly laborCodeRegulationGenericRepository: Repository<LaborCodeRegulation>,
  ) {
    super(laborCodeRegulationGenericRepository);
  }
}

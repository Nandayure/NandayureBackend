import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobPosition } from '../entities/job-position.entity';
import { BaseAbstractRepostitory } from 'src/core/generic-repository/repository/base.repository';
import { JobPositionRepositoryInterface } from './job-position.interface';
import { GetJobPositionFilterDto } from '../dto/get-jobPosition-filter.dto';

export class JobPositionRepository
  extends BaseAbstractRepostitory<JobPosition>
  implements JobPositionRepositoryInterface
{
  constructor(
    @InjectRepository(JobPosition)
    private readonly jobPositionGenericRepository: Repository<JobPosition>,
  ) {
    super(jobPositionGenericRepository);
  }

  async getJobPositionsWithFilter(
    getJobPositionFilterDto: GetJobPositionFilterDto,
  ): Promise<[JobPosition[], number]> {
    const { id, name, limit, page = 1 } = getJobPositionFilterDto;

    const take = limit ? Number(limit) : null;
    const skip = (Number(page) - 1) * take;

    const query = this.jobPositionGenericRepository
      .createQueryBuilder('jobPosition')
      .orderBy('jobPosition.Name', 'ASC');
    if (take) {
      query.take(take);
      query.skip(skip);
    }

    if (id) {
      query.andWhere('jobPosition.id = :id', { id });
    }
    if (name) {
      query.andWhere('jobPosition.Name LIKE :name', {
        name: `${name}%`,
      });
    }

    const [jobPositions, total] = await query.getManyAndCount();
    return [jobPositions, total];
  }
}

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudiesCategory } from '../entities/studies-category.entity';
import { BaseAbstractRepostitory } from 'src/core/generic-repository/repository/base.repository';
import { StudiesCategoryRepositoryInterface } from './StudiesCategory.interface';

export class StudiesCategoryRepository
  extends BaseAbstractRepostitory<StudiesCategory>
  implements StudiesCategoryRepositoryInterface
{
  constructor(
    @InjectRepository(StudiesCategory)
    private readonly studiesCategoryRepository: Repository<StudiesCategory>,
  ) {
    super(studiesCategoryRepository);
  }
}

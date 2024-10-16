import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Study } from '../entities/study.entity';

import { BaseAbstractRepostitory } from 'src/core/generic-repository/repository/base.repository';

import { StudyRepositoryInterface } from './study.interface';

export class StudyRepository
  extends BaseAbstractRepostitory<Study>
  implements StudyRepositoryInterface
{
  constructor(
    @InjectRepository(Study)
    private readonly studyRepository: Repository<Study>,
  ) {
    super(studyRepository);
  }
}

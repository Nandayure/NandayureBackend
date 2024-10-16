import { BaseAbstractRepostitory } from 'src/core/generic-repository/repository/base.repository';

import { Study } from '../entities/study.entity';

export interface StudyRepositoryInterface
  extends BaseAbstractRepostitory<Study> {}

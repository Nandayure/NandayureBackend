import { BaseAbstractRepostitory } from 'src/core/generic-repository/repository/base.repository';

import { StudiesCategory } from '../entities/studies-category.entity';

export interface StudiesCategoryRepositoryInterface
  extends BaseAbstractRepostitory<StudiesCategory> {}

import { BaseInterfaceRepository } from 'src/core/generic-repository/interface/base.interface';
import { FaqCategory } from '../entities/faq-category.entity';

export interface FaqCategoryRepositoryInterface
  extends BaseInterfaceRepository<FaqCategory> {}

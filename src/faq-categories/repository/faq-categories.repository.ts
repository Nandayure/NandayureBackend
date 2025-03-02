import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FaqCategory } from '../entities/faq-category.entity';
import { BaseAbstractRepostitory } from 'src/core/generic-repository/repository/base.repository';
import { FaqCategoryRepositoryInterface } from './faq-categories.interface';

export class FaqCategoryRepository
  extends BaseAbstractRepostitory<FaqCategory>
  implements FaqCategoryRepositoryInterface
{
  constructor(
    @InjectRepository(FaqCategory)
    private readonly faqCategoryGenericRepository: Repository<FaqCategory>,
  ) {
    super(faqCategoryGenericRepository);
  }
}

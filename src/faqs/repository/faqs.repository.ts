import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Faq } from '../entities/faq.entity';
import { BaseAbstractRepostitory } from 'src/core/generic-repository/repository/base.repository';
import { FaqRepositoryInterface } from './faqs.interface';

export class FaqRepository
  extends BaseAbstractRepostitory<Faq>
  implements FaqRepositoryInterface
{
  constructor(
    @InjectRepository(Faq)
    private readonly faqGenericRepository: Repository<Faq>,
  ) {
    super(faqGenericRepository);
  }
}

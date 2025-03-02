import { Test, TestingModule } from '@nestjs/testing';
import { FaqCategoriesService } from './faq-categories.service';

describe('FaqCategoriesService', () => {
  let service: FaqCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FaqCategoriesService],
    }).compile();

    service = module.get<FaqCategoriesService>(FaqCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

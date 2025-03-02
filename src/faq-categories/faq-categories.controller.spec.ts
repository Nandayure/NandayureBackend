import { Test, TestingModule } from '@nestjs/testing';
import { FaqCategoriesController } from './faq-categories.controller';
import { FaqCategoriesService } from './faq-categories.service';

describe('FaqCategoriesController', () => {
  let controller: FaqCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FaqCategoriesController],
      providers: [FaqCategoriesService],
    }).compile();

    controller = module.get<FaqCategoriesController>(FaqCategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

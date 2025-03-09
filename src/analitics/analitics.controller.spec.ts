import { Test, TestingModule } from '@nestjs/testing';
import { AnaliticsController } from './analitics.controller';
import { AnaliticsService } from './analitics.service';

describe('AnaliticsController', () => {
  let controller: AnaliticsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnaliticsController],
      providers: [AnaliticsService],
    }).compile();

    controller = module.get<AnaliticsController>(AnaliticsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

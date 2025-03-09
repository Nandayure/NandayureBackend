import { Test, TestingModule } from '@nestjs/testing';
import { AnaliticsService } from './analitics.service';

describe('AnaliticsService', () => {
  let service: AnaliticsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnaliticsService],
    }).compile();

    service = module.get<AnaliticsService>(AnaliticsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { RequestTypesService } from './request-types.service';

describe('RequestTypesService', () => {
  let service: RequestTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestTypesService],
    }).compile();

    service = module.get<RequestTypesService>(RequestTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

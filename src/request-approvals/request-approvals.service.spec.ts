import { Test, TestingModule } from '@nestjs/testing';
import { RequestApprovalsService } from './request-approvals.service';

describe('RequestApprovalsService', () => {
  let service: RequestApprovalsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestApprovalsService],
    }).compile();

    service = module.get<RequestApprovalsService>(RequestApprovalsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

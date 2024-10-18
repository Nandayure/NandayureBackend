import { Test, TestingModule } from '@nestjs/testing';
import { PayrollDetailService } from './payroll-detail.service';

describe('PayrollDetailService', () => {
  let service: PayrollDetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PayrollDetailService],
    }).compile();

    service = module.get<PayrollDetailService>(PayrollDetailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { PayrollDetailController } from './payroll-detail.controller';
import { PayrollDetailService } from './payroll-detail.service';

describe('PayrollDetailController', () => {
  let controller: PayrollDetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PayrollDetailController],
      providers: [PayrollDetailService],
    }).compile();

    controller = module.get<PayrollDetailController>(PayrollDetailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

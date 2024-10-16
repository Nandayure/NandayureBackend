import { Test, TestingModule } from '@nestjs/testing';
import { RequestApprovalsController } from './request-approvals.controller';
import { RequestApprovalsService } from './request-approvals.service';

describe('RequestApprovalsController', () => {
  let controller: RequestApprovalsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequestApprovalsController],
      providers: [RequestApprovalsService],
    }).compile();

    controller = module.get<RequestApprovalsController>(
      RequestApprovalsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

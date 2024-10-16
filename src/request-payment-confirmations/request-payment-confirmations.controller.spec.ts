import { Test, TestingModule } from '@nestjs/testing';
import { RequestPaymentConfirmationsController } from './request-payment-confirmations.controller';
import { RequestPaymentConfirmationsService } from './request-payment-confirmations.service';

describe('RequestPaymentConfirmationsController', () => {
  let controller: RequestPaymentConfirmationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequestPaymentConfirmationsController],
      providers: [RequestPaymentConfirmationsService],
    }).compile();

    controller = module.get<RequestPaymentConfirmationsController>(
      RequestPaymentConfirmationsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

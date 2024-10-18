import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesStateController } from './employees-state.controller';
import { EmployeesStateService } from './employees-state.service';

describe('EmployeesStateController', () => {
  let controller: EmployeesStateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeesStateController],
      providers: [EmployeesStateService],
    }).compile();

    controller = module.get<EmployeesStateController>(EmployeesStateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

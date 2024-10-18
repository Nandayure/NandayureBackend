import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeProcedureController } from './employee-procedure.controller';
import { EmployeeProcedureService } from './employee-procedure.service';

describe('EmployeeProcedureController', () => {
  let controller: EmployeeProcedureController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeProcedureController],
      providers: [EmployeeProcedureService],
    }).compile();

    controller = module.get<EmployeeProcedureController>(EmployeeProcedureController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

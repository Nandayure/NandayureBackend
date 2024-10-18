import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeProcedureService } from './employee-procedure.service';

describe('EmployeeProcedureService', () => {
  let service: EmployeeProcedureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeProcedureService],
    }).compile();

    service = module.get<EmployeeProcedureService>(EmployeeProcedureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

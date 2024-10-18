import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesStateService } from './employees-state.service';

describe('EmployeesStateService', () => {
  let service: EmployeesStateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeesStateService],
    }).compile();

    service = module.get<EmployeesStateService>(EmployeesStateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

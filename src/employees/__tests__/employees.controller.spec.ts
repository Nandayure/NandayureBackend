import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesController } from '../employees.controller';
import { EmployeesService } from '../employees.service';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { Employee } from '../entities/employee.entity';
import { UpdateEmployeeDto } from '../dto/update-employee.dto';

describe('EmployeesController (Unit Test)', () => {
  let controller: EmployeesController;
  let service: EmployeesService;
  const employeeEntity: Employee = {
    id: '1',
    Name: 'John',
    Surname1: 'Doe',
    Surname2: 'Smith',
    Birthdate: new Date('1990-01-01'),
    HiringDate: new Date('2021-01-01'),
    Email: 'marcortes.com',
    CellPhone: '123456789',
    NumberChlidren: 0,
    AvailableVacationDays: 30,
    MaritalStatusId: 1,
    GenderId: 1,
    JobPositionId: 1,
    DriveFolder: null,
    MaritalStatus: null,
    JobPosition: null,
    trainings: [],
    Studies: [],
    FinancialInstitutions: [],
    annuities: [],
    overtimes: [],
    attendances: [],
    requests: [],
    Gender: null,
    EmbargoId: null,
    User: {
      id: '1',
      Password: '123456',
      Employee: null,
      Roles: [],
    },
    length: 0,
  };

  beforeEach(async () => {
    const mockService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOneById: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeesController],
      providers: [{ provide: EmployeesService, useValue: mockService }],
    }).compile();

    controller = module.get<EmployeesController>(EmployeesController);
    service = module.get<EmployeesService>(EmployeesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a employee', async () => {
    const createEmployeeDto: CreateEmployeeDto = {
      id: '1',
      Name: 'John',
      Surname1: 'Doe',
      Surname2: 'Smith',
      Birthdate: new Date('1990-01-01'),
      HiringDate: new Date('2021-01-01'),
      Email: 'marcortes.com',
      CellPhone: '123456789',
      NumberChlidren: 0,
      AvailableVacationDays: 30,
      MaritalStatusId: 1,
      GenderId: 1,
      JobPositionId: 1,
    };

    jest.spyOn(service, 'create').mockResolvedValue(employeeEntity);

    const result = await controller.create(createEmployeeDto);
    expect(result).toEqual(employeeEntity);
  });

  it('should return all employees', async () => {
    const employees = [employeeEntity];
    jest.spyOn(service, 'findAll').mockResolvedValue(employees);

    const result = await controller.findAll();
    expect(result).toEqual(employees);
  });

  it('should update a employee', async () => {
    const updateEmployeeDto: UpdateEmployeeDto = {
      id: '1',
      Name: 'John',
      Surname1: 'Doe',
      Surname2: 'Smith',
      Birthdate: new Date('1990-01-01'),
      HiringDate: new Date('2021-01-01'),
      Email: 'marcortes.com',
      CellPhone: '123456789',
      NumberChlidren: 0,
      AvailableVacationDays: 30,
      MaritalStatusId: 1,
      GenderId: 1,
      JobPositionId: 1,
    };

    jest.spyOn(service, 'update').mockResolvedValue(employeeEntity);

    const result = await controller.update('1', updateEmployeeDto);
    expect(result).toEqual(employeeEntity);
  });
});

import { Injectable } from '@nestjs/common';
import { CreatePayrollDto } from './dto/create-payroll.dto';
import { UpdatePayrollDto } from './dto/update-payroll.dto';
import { PayrollRepository } from './repository/payroll.repository';
import { EmployeesService } from 'src/employees/employees.service';

@Injectable()
export class PayrollService {
  constructor(
    private readonly payrollRepository: PayrollRepository,
    employeeService: EmployeesService,
  ) {}

  async create(createPayrollDto: CreatePayrollDto) {
    const newPayroll = this.payrollRepository.create(createPayrollDto);

    return await this.payrollRepository.save(newPayroll);
  }

  async findAll() {
    return `This action returns all payroll`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} payroll`;
  }

  async update(id: number, updatePayrollDto: UpdatePayrollDto) {
    return `This action updates a #${id} payroll`;
  }

  async remove(id: number) {
    return `This action removes a #${id} payroll`;
  }
}

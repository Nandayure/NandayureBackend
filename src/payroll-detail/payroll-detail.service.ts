import { Injectable } from '@nestjs/common';
import { CreatePayrollDetailDto } from './dto/create-payroll-detail.dto';
import { UpdatePayrollDetailDto } from './dto/update-payroll-detail.dto';

@Injectable()
export class PayrollDetailService {
  create(createPayrollDetailDto: CreatePayrollDetailDto) {
    return 'This action adds a new payrollDetail';
  }

  findAll() {
    return `This action returns all payrollDetail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payrollDetail`;
  }

  update(id: number, updatePayrollDetailDto: UpdatePayrollDetailDto) {
    return `This action updates a #${id} payrollDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} payrollDetail`;
  }
}

import { Injectable } from '@nestjs/common';
import { CreateEmployeesStateDto } from './dto/create-employees-state.dto';
import { UpdateEmployeesStateDto } from './dto/update-employees-state.dto';

@Injectable()
export class EmployeesStateService {
  create(createEmployeesStateDto: CreateEmployeesStateDto) {
    return 'This action adds a new employeesState';
  }

  findAll() {
    return `This action returns all employeesState`;
  }

  findOne(id: number) {
    return `This action returns a #${id} employeesState`;
  }

  update(id: number, updateEmployeesStateDto: UpdateEmployeesStateDto) {
    return `This action updates a #${id} employeesState`;
  }

  remove(id: number) {
    return `This action removes a #${id} employeesState`;
  }
}

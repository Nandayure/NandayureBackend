import { Injectable } from '@nestjs/common';
import { CreateEmployeeProcedureDto } from './dto/create-employee-procedure.dto';
import { UpdateEmployeeProcedureDto } from './dto/update-employee-procedure.dto';

@Injectable()
export class EmployeeProcedureService {
  create(createEmployeeProcedureDto: CreateEmployeeProcedureDto) {
    return 'This action adds a new employeeProcedure';
  }

  findAll() {
    return `This action returns all employeeProcedure`;
  }

  findOne(id: number) {
    return `This action returns a #${id} employeeProcedure`;
  }

  update(id: number, updateEmployeeProcedureDto: UpdateEmployeeProcedureDto) {
    return `This action updates a #${id} employeeProcedure`;
  }

  remove(id: number) {
    return `This action removes a #${id} employeeProcedure`;
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmployeeProcedureService } from './employee-procedure.service';
import { CreateEmployeeProcedureDto } from './dto/create-employee-procedure.dto';
import { UpdateEmployeeProcedureDto } from './dto/update-employee-procedure.dto';

@Controller('employee-procedure')
export class EmployeeProcedureController {
  constructor(private readonly employeeProcedureService: EmployeeProcedureService) {}

  @Post()
  create(@Body() createEmployeeProcedureDto: CreateEmployeeProcedureDto) {
    return this.employeeProcedureService.create(createEmployeeProcedureDto);
  }

  @Get()
  findAll() {
    return this.employeeProcedureService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeProcedureService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeProcedureDto: UpdateEmployeeProcedureDto) {
    return this.employeeProcedureService.update(+id, updateEmployeeProcedureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeProcedureService.remove(+id);
  }
}

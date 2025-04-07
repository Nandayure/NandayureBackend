import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
@ApiTags('employees')
@Controller('employees')
@UseGuards(AuthGuard)
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @Get('deleted')
  findDeleted() {
    return this.employeesService.getEmployeesDeleted();
  }

  @Patch('restore/:id')
  restore(@Param('id') id: string) {
    return this.employeesService.restore(id);
  }

  @Get()
  findAll() {
    return this.employeesService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeesService.update(id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeesService.delete(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeesService.findOneById(id);
  }
}

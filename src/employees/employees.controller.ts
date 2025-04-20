import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UpdateEmployeeJobPosition } from './dto/updateEmployeeJobPosition';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/auth-roles/role.enum';
import { Roles } from 'src/auth/auth-roles/roles.decorator';
import { GetEmployeesFilterDto } from './dto/get-employees-filter.dto';
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

  @Get('vacationDays/:id')
  getEmployeeAvaibleVacantionsDays(@Param('id') id: string) {
    return this.employeesService.getEmployeeAvaibleVacantionsDays(id);
  }

  @Get()
  findAll(@Query() query: GetEmployeesFilterDto) {
    return this.employeesService.findAll(query);
  }

  @Get('allByDepartment/:id')
  findAllByDepartment(@Param('id') id: string) {
    return this.employeesService.getEmployeesByDepartment(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeesService.update(id, updateEmployeeDto);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.RRHH)
  @Patch('updateEmployeeJobPosition/:employeeId')
  updateJobPosition(
    @Param('employeeId') employeeId: string,
    @Body() updateEmployeeJobPosition: UpdateEmployeeJobPosition,
  ) {
    return this.employeesService.updateEmployeeJobPosition(
      employeeId,
      updateEmployeeJobPosition,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeesService.delete(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeesService.getBasicInfoEmployee(id);
  }
}

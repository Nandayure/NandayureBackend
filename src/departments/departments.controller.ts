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
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UpdateDepartmentHeadDto } from './dto/update-department-head.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/auth-roles/role.enum';
import { Roles } from 'src/auth/auth-roles/roles.decorator';
import { GetDepartmentsFilterDto } from './dto/get-departments-fiter.dto';

@ApiTags('departments')
@Controller('departments')
@UseGuards(AuthGuard)
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Post()
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentsService.create(createDepartmentDto);
  }

  @Get()
  findAll(@Query() getDepartmentsFilterDto: GetDepartmentsFilterDto) {
    return this.departmentsService.findAll(getDepartmentsFilterDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.departmentsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ) {
    return this.departmentsService.update(+id, updateDepartmentDto);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.RRHH)
  @Patch('updateDepartmentHead/:id')
  updateDepartmentHead(
    @Param('id') id: string,
    @Body() updateDepartmentHeadDto: UpdateDepartmentHeadDto,
  ) {
    return this.departmentsService.updateDepartmentHead(
      +id,
      updateDepartmentHeadDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.departmentsService.remove(+id);
  }
}

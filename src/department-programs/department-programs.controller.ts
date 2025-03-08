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
import { DepartmentProgramsService } from './department-programs.service';
import { CreateDepartmentProgramDto } from './dto/create-department-program.dto';
import { UpdateDepartmentProgramDto } from './dto/update-department-program.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
@ApiTags('department-programs')
@Controller('department-programs')
@UseGuards(AuthGuard)
export class DepartmentProgramsController {
  constructor(
    private readonly departmentProgramsService: DepartmentProgramsService,
  ) {}

  @Post()
  create(@Body() createDepartmentProgramDto: CreateDepartmentProgramDto) {
    return this.departmentProgramsService.create(createDepartmentProgramDto);
  }

  @Get()
  findAll() {
    return this.departmentProgramsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.departmentProgramsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDepartmentProgramDto: UpdateDepartmentProgramDto,
  ) {
    return this.departmentProgramsService.update(
      +id,
      updateDepartmentProgramDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.departmentProgramsService.remove(+id);
  }
}

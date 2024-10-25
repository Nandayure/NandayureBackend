import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PayrollDetailService } from './payroll-detail.service';
import { CreatePayrollDetailDto } from './dto/create-payroll-detail.dto';
import { UpdatePayrollDetailDto } from './dto/update-payroll-detail.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('payroll-detail')
@Controller('payroll-detail')
export class PayrollDetailController {
  constructor(private readonly payrollDetailService: PayrollDetailService) {}

  @Post()
  create(@Body() createPayrollDetailDto: CreatePayrollDetailDto) {
    return this.payrollDetailService.create(createPayrollDetailDto);
  }

  @Get()
  findAll() {
    return this.payrollDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.payrollDetailService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePayrollDetailDto: UpdatePayrollDetailDto,
  ) {
    return this.payrollDetailService.update(+id, updatePayrollDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.payrollDetailService.remove(+id);
  }
}

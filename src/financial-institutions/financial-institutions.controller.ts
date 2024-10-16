import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FinancialInstitutionsService } from './financial-institutions.service';
import { CreateFinancialInstitutionDto } from './dto/create-financial-institution.dto';
import { UpdateFinancialInstitutionDto } from './dto/update-financial-institution.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('financial-institutions')
@Controller('financial-institutions')
export class FinancialInstitutionsController {
  constructor(
    private readonly financialInstitutionsService: FinancialInstitutionsService,
  ) {}

  @Post()
  create(@Body() createFinancialInstitutionDto: CreateFinancialInstitutionDto) {
    return this.financialInstitutionsService.create(
      createFinancialInstitutionDto,
    );
  }

  @Get()
  findAll() {
    return this.financialInstitutionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.financialInstitutionsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFinancialInstitutionDto: UpdateFinancialInstitutionDto,
  ) {
    return this.financialInstitutionsService.update(
      +id,
      updateFinancialInstitutionDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.financialInstitutionsService.remove(+id);
  }
}

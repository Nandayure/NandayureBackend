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
import { TypeFinancialInstitutionsService } from './type-financial-institutions.service';
import { CreateTypeFinancialInstitutionDto } from './dto/create-type-financial-institution.dto';
import { UpdateTypeFinancialInstitutionDto } from './dto/update-type-financial-institution.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@ApiTags('type-financial-institutions')
@Controller('type-financial-institutions')
@UseGuards(AuthGuard)
export class TypeFinancialInstitutionsController {
  constructor(
    private readonly typeFinancialInstitutionsService: TypeFinancialInstitutionsService,
  ) {}

  @Post()
  create(
    @Body()
    createTypeFinancialInstitutionDto: CreateTypeFinancialInstitutionDto,
  ) {
    return this.typeFinancialInstitutionsService.create(
      createTypeFinancialInstitutionDto,
    );
  }

  @Get()
  findAll() {
    return this.typeFinancialInstitutionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typeFinancialInstitutionsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateTypeFinancialInstitutionDto: UpdateTypeFinancialInstitutionDto,
  ) {
    return this.typeFinancialInstitutionsService.update(
      +id,
      updateTypeFinancialInstitutionDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typeFinancialInstitutionsService.remove(+id);
  }
}

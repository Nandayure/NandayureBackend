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
import { LaborCodeRegulationsService } from './labor-code-regulations.service';
import { CreateLaborCodeRegulationDto } from './dto/create-labor-code-regulation.dto';
import { UpdateLaborCodeRegulationDto } from './dto/update-labor-code-regulation.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@ApiTags('labor-code-regulations')
@Controller('labor-code-regulations')
@UseGuards(AuthGuard)
export class LaborCodeRegulationsController {
  constructor(
    private readonly laborCodeRegulationsService: LaborCodeRegulationsService,
  ) {}

  @Post()
  create(@Body() createLaborCodeRegulationDto: CreateLaborCodeRegulationDto) {
    return this.laborCodeRegulationsService.create(
      createLaborCodeRegulationDto,
    );
  }

  @Get()
  findAll() {
    return this.laborCodeRegulationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.laborCodeRegulationsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLaborCodeRegulationDto: UpdateLaborCodeRegulationDto,
  ) {
    return this.laborCodeRegulationsService.update(
      +id,
      updateLaborCodeRegulationDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.laborCodeRegulationsService.remove(+id);
  }
}

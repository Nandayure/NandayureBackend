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
import { MunicipalityService } from './municipality.service';
import { CreateMunicipalityDto } from './dto/create-municipality.dto';
import { UpdateMunicipalityDto } from './dto/update-municipality.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
@ApiTags('municipality')
@Controller('municipality')
@UseGuards(AuthGuard)
export class MunicipalityController {
  constructor(private readonly municipalityService: MunicipalityService) {}

  @Post()
  create(@Body() createMunicipalityDto: CreateMunicipalityDto) {
    return this.municipalityService.create(createMunicipalityDto);
  }

  @Get()
  findAll() {
    return this.municipalityService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.municipalityService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMunicipalityDto: UpdateMunicipalityDto,
  ) {
    return this.municipalityService.update(+id, updateMunicipalityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.municipalityService.remove(+id);
  }
}

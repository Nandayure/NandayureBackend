import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AnaliticsService } from './analitics.service';
import { CreateAnaliticDto } from './dto/create-analitic.dto';
import { UpdateAnaliticDto } from './dto/update-analitic.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('analitics')
@ApiTags('analitics')
export class AnaliticsController {
  constructor(private readonly analiticsService: AnaliticsService) {}

  @Post()
  create(@Body() createAnaliticDto: CreateAnaliticDto) {
    return this.analiticsService.create(createAnaliticDto);
  }

  @Get()
  findAll() {
    return this.analiticsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.analiticsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAnaliticDto: UpdateAnaliticDto,
  ) {
    return this.analiticsService.update(+id, updateAnaliticDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.analiticsService.remove(+id);
  }
}

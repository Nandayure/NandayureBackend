import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StudiesCategoryService } from './studies-category.service';
import { CreateStudiesCategoryDto } from './dto/create-studies-category.dto';
import { UpdateStudiesCategoryDto } from './dto/update-studies-category.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('studies-category')
@Controller('studies-category')
export class StudiesCategoryController {
  constructor(
    private readonly studiesCategoryService: StudiesCategoryService,
  ) {}

  @Post()
  create(@Body() createStudiesCategoryDto: CreateStudiesCategoryDto) {
    return this.studiesCategoryService.create(createStudiesCategoryDto);
  }

  @Get()
  findAll() {
    return this.studiesCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studiesCategoryService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStudiesCategoryDto: UpdateStudiesCategoryDto,
  ) {
    return this.studiesCategoryService.update(id, updateStudiesCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studiesCategoryService.remove(id);
  }
}

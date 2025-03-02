import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FaqCategoriesService } from './faq-categories.service';
import { CreateFaqCategoryDto } from './dto/create-faq-category.dto';
import { UpdateFaqCategoryDto } from './dto/update-faq-category.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('faq_categories')
@Controller('faq-categories')
export class FaqCategoriesController {
  constructor(private readonly faqCategoriesService: FaqCategoriesService) {}

  @Post()
  create(@Body() createFaqCategoryDto: CreateFaqCategoryDto) {
    return this.faqCategoriesService.create(createFaqCategoryDto);
  }

  @Get()
  findAll() {
    return this.faqCategoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.faqCategoriesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFaqCategoryDto: UpdateFaqCategoryDto,
  ) {
    return this.faqCategoriesService.update(+id, updateFaqCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.faqCategoriesService.remove(+id);
  }
}

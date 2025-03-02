import { Module } from '@nestjs/common';
import { FaqCategoriesService } from './faq-categories.service';
import { FaqCategoriesController } from './faq-categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FaqCategory } from './entities/faq-category.entity';
import { FaqCategoryRepository } from './repository/faq-categories.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FaqCategory])],
  controllers: [FaqCategoriesController],
  providers: [FaqCategoriesService, FaqCategoryRepository],
  exports: [FaqCategoriesService],
})
export class FaqCategoriesModule {}

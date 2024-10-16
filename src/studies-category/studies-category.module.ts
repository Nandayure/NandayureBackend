import { Module } from '@nestjs/common';
import { StudiesCategoryService } from './studies-category.service';
import { StudiesCategoryController } from './studies-category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudiesCategory } from './entities/studies-category.entity';
import { StudiesCategoryRepository } from './repository/StudiesCategory.repository';

@Module({
  imports: [TypeOrmModule.forFeature([StudiesCategory])],
  controllers: [StudiesCategoryController],
  providers: [StudiesCategoryService, StudiesCategoryRepository],
  exports: [StudiesCategoryService],
})
export class StudiesCategoryModule {}

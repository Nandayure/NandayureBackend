import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudiesCategoryDto } from './dto/create-studies-category.dto';
import { UpdateStudiesCategoryDto } from './dto/update-studies-category.dto';
import { StudiesCategoryRepository } from './repository/StudiesCategory.repository';

@Injectable()
export class StudiesCategoryService {
  constructor(
    private readonly studiesCategoryRepository: StudiesCategoryRepository,
  ) {}
  async create(createStudiesCategoryDto: CreateStudiesCategoryDto) {
    const newCategory = this.studiesCategoryRepository.create(
      createStudiesCategoryDto,
    );

    return await this.studiesCategoryRepository.save(newCategory);
  }

  async findAll() {
    return await this.studiesCategoryRepository.findAll();
  }

  async findOne(id: string) {
    return await this.studiesCategoryRepository.findOneById(id);
  }

  async update(id: string, updateStudiesCategoryDto: UpdateStudiesCategoryDto) {
    const categoryToEdit = await this.studiesCategoryRepository.findOneById(id);

    if (!categoryToEdit) {
      throw new NotFoundException('registro no encontrado');
    }

    return await this.studiesCategoryRepository.save({
      ...categoryToEdit,
      ...updateStudiesCategoryDto,
    });
  }

  async remove(id: string) {
    const categoryToRemove =
      await this.studiesCategoryRepository.findOneById(id);

    if (!categoryToRemove) {
      throw new NotFoundException('registro no encontrado');
    }

    return await this.studiesCategoryRepository.remove(categoryToRemove);
  }
}

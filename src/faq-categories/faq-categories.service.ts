import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateFaqCategoryDto } from './dto/create-faq-category.dto';
import { UpdateFaqCategoryDto } from './dto/update-faq-category.dto';
import { FaqCategoryRepository } from './repository/faq-categories.repository';

@Injectable()
export class FaqCategoriesService {
  constructor(private readonly faqCategoryRepository: FaqCategoryRepository) {}

  async create(createFaqCategoryDto: CreateFaqCategoryDto) {
    try {
      const faqCategoryExists = await this.faqCategoryRepository.findOne({
        where: { name: createFaqCategoryDto.name },
      });

      if (faqCategoryExists) {
        return { message: 'La categoria ya existe: ' + faqCategoryExists.name };
      }

      const newFaqCategory =
        this.faqCategoryRepository.create(createFaqCategoryDto);
      return this.faqCategoryRepository.save(newFaqCategory);
    } catch (error) {
      console.error('Error:', error);
      // Manejo de cualquier otra excepción no prevista
      throw new InternalServerErrorException({
        message: 'Error al crear la nueva categoria: ' + error.message,
      });
    }
  }

  async findAll() {
    return await this.faqCategoryRepository.findAll();
  }

  async findOne(id: number) {
    return await this.faqCategoryRepository.findOneById(id);
  }

  async update(id: number, updateFaqCategoryDto: UpdateFaqCategoryDto) {
    const faqCategoryToUpdate =
      await this.faqCategoryRepository.findOneById(id);
    if (!faqCategoryToUpdate) {
      throw new BadRequestException({
        message: 'La categoria no existe',
      });
    }

    const updatedFaqCategory = await this.faqCategoryRepository.save({
      ...faqCategoryToUpdate,
      ...updateFaqCategoryDto,
    });
    return updatedFaqCategory;
  }

  async remove(id: number) {
    try {
      const faqCategoryToDelete =
        await this.faqCategoryRepository.findOneById(id);
      if (!faqCategoryToDelete) {
        throw new BadRequestException({
          message: 'La categoria no existe',
        });
      }
      return await this.faqCategoryRepository.remove(faqCategoryToDelete);
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Error al eliminar la categoria: ' + error.message,
      });
    }
  }
}

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { FaqRepository } from './repository/faqs.repository';

@Injectable()
export class FaqsService {
  constructor(private readonly faqRepository: FaqRepository) {}

  async create(createFaqDto: CreateFaqDto) {
    try {
      const faqExists = await this.faqRepository.findOne({
        where: { question: createFaqDto.question },
      });

      if (faqExists) {
        return { message: 'La pregunta ya existe: ' + faqExists.question };
      }

      const newFaq = this.faqRepository.create({
        ...createFaqDto,
        created_at: new Date(),
      });
      return this.faqRepository.save(newFaq);
    } catch (error) {
      console.error('Error:', error);
      throw new InternalServerErrorException({
        message: 'Error al crear la nueva categoria: ' + error.message,
      });
    }
  }

  async findAll() {
    return await this.faqRepository.findAll();
  }

  async findOne(id: number) {
    return await this.faqRepository.findOneById(id);
  }

  async update(id: number, updateFaqDto: UpdateFaqDto) {
    try {
      const faqToUpdate = await this.faqRepository.findOneById(id);
      if (!faqToUpdate) {
        return { message: 'La pregunta no existe' };
      }

      const updatedFaq = await this.faqRepository.save({
        ...faqToUpdate,
        ...updateFaqDto,
        updated_at: new Date(),
      });
      return updatedFaq;
    } catch (error) {
      console.error('Error:', error);
      throw new InternalServerErrorException({
        message: 'Error al actualizar la pregunta: ' + error.message,
      });
    }
  }

  async remove(id: number) {
    try {
      const faqToDelete = await this.faqRepository.findOneById(id);
      if (!faqToDelete) {
        return { message: 'La pregunta no existe' };
      }
      await this.faqRepository.remove(faqToDelete);
      return { message: 'Pregunta eliminada' };
    } catch (error) {
      console.error('Error:', error);
      throw new InternalServerErrorException({
        message: 'Error al eliminar la pregunta: ' + error.message,
      });
    }
  }
}

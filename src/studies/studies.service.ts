import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudyDto } from './dto/create-study.dto';
import { UpdateStudyDto } from './dto/update-study.dto';
import { StudyRepository } from './repository/study.repository';

@Injectable()
export class StudiesService {
  constructor(private readonly studyRepository: StudyRepository) {}

  async create(createStudyDto: CreateStudyDto) {
    const newStudy = this.studyRepository.create(createStudyDto);

    return await this.studyRepository.save(newStudy);
  }

  async findAll() {
    return await this.studyRepository.findAll();
  }

  async findOne(id: number) {
    return await this.studyRepository.findOneById(id);
  }

  async update(id: number, updateStudyDto: UpdateStudyDto) {
    const studyToEdit = await this.studyRepository.findOneById(id);

    if (!studyToEdit) {
      throw new NotFoundException('registro no encontrado');
    }

    return await this.studyRepository.save({
      ...studyToEdit,
      ...updateStudyDto,
    });
  }

  async remove(id: number) {
    try {
      const studyToRemove = await this.studyRepository.findOne({
        where: { id },
        relations: {
          Employees: true,
        },
      });
      if (!studyToRemove) {
        throw new NotFoundException('registro no encontrado');
      }
      if (studyToRemove.Employees.length > 0) {
        throw new NotFoundException(
          'No se puede eliminar los estudios porque está relacionado con empleados',
        );
      }
      return await this.studyRepository.remove(studyToRemove);
    } catch (error) {
      throw error;
    }
  }
}

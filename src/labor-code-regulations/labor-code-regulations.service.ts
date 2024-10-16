import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLaborCodeRegulationDto } from './dto/create-labor-code-regulation.dto';
import { UpdateLaborCodeRegulationDto } from './dto/update-labor-code-regulation.dto';
import { LaborCodeRegulationRepository } from './repository/LaborCodeRegulation.repository';

@Injectable()
export class LaborCodeRegulationsService {
  constructor(
    private readonly laborCodeRegulationRepository: LaborCodeRegulationRepository,
  ) {}
  async create(createLaborCodeRegulationDto: CreateLaborCodeRegulationDto) {
    const newRegulation = this.laborCodeRegulationRepository.create(
      createLaborCodeRegulationDto,
    );

    return await this.laborCodeRegulationRepository.save(newRegulation);
  }

  async findAll() {
    return await this.laborCodeRegulationRepository.findAll();
  }

  async findOne(id: number) {
    return await this.laborCodeRegulationRepository.findOneById(id);
  }

  async update(
    id: number,
    updateLaborCodeRegulationDto: UpdateLaborCodeRegulationDto,
  ) {
    const regulationToEdit =
      await this.laborCodeRegulationRepository.findOneById(id);
    if (!regulationToEdit) {
      throw new NotFoundException('No se encontró el registro a editar');
    }

    return this.laborCodeRegulationRepository.save({
      ...regulationToEdit,
      ...updateLaborCodeRegulationDto,
    });
  }

  async remove(id: number) {
    const regulationToRemove =
      await this.laborCodeRegulationRepository.findOneById(id);
    if (!regulationToRemove) {
      throw new NotFoundException('No se encontró el registro a eliminar');
    }
    return await this.laborCodeRegulationRepository.remove(regulationToRemove);
  }
}

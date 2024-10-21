import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFinancialInstitutionDto } from './dto/create-financial-institution.dto';
import { UpdateFinancialInstitutionDto } from './dto/update-financial-institution.dto';
import { FinancialInstitutionRepository } from './repository/FinancialInstitution.repository';

@Injectable()
export class FinancialInstitutionsService {
  constructor(
    private readonly financialInstitutionRepository: FinancialInstitutionRepository,
  ) {}

  async create(createFinancialInstitutionDto: CreateFinancialInstitutionDto) {
    const financialInstitution = this.financialInstitutionRepository.create(
      createFinancialInstitutionDto,
    );
    return this.financialInstitutionRepository.save(financialInstitution);
  }

  async findAll() {
    return await this.financialInstitutionRepository.findAll();
  }

  async findOne(id: number) {
    return await this.financialInstitutionRepository.findOneById(id);
  }

  async update(
    id: number,
    updateFinancialInstitutionDto: UpdateFinancialInstitutionDto,
  ) {
    const financialInstitutionToUpdate =
      await this.financialInstitutionRepository.findOneById(id);

    if (!financialInstitutionToUpdate) {
      throw new NotFoundException('Registro no encontrado');
    }

    return await this.financialInstitutionRepository.save({
      ...financialInstitutionToUpdate,
      ...updateFinancialInstitutionDto,
    });
  }

  async remove(id: number) {
    const financialInstitutionToRemove =
      await this.financialInstitutionRepository.findOneById(id);

    if (!financialInstitutionToRemove) {
      throw new NotFoundException('Registro no encontrado');
    }

    return await this.financialInstitutionRepository.remove(
      financialInstitutionToRemove,
    );
  }
}

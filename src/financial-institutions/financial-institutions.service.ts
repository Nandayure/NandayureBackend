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
    try {
      const financialInstitutionToRemove =
        await this.financialInstitutionRepository.findOne({
          where: { id },
          relations: {
            Employees: true,
          },
        });

      if (!financialInstitutionToRemove) {
        throw new NotFoundException('Registro no encontrado');
      }
      if (financialInstitutionToRemove.Employees.length > 0) {
        throw new NotFoundException(
          'No se puede eliminar la institución financiera porque está relacionado con empleados',
        );
      }
      return await this.financialInstitutionRepository.remove(
        financialInstitutionToRemove,
      );
    } catch (error) {
      throw error;
    }
  }
}

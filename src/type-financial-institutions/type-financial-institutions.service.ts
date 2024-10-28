import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTypeFinancialInstitutionDto } from './dto/create-type-financial-institution.dto';
import { UpdateTypeFinancialInstitutionDto } from './dto/update-type-financial-institution.dto';
import { TypeFinancialInstitutionRepository } from './repository/TypeFinancialInstitution.repository';

@Injectable()
export class TypeFinancialInstitutionsService {
  constructor(
    private readonly typeFinantialInstitutionRepository: TypeFinancialInstitutionRepository,
  ) {}

  async create(
    createTypeFinancialInstitutionDto: CreateTypeFinancialInstitutionDto,
  ) {
    const newType = this.typeFinantialInstitutionRepository.create(
      createTypeFinancialInstitutionDto,
    );

    return await this.typeFinantialInstitutionRepository.save(newType);
  }

  async findAll() {
    return await this.typeFinantialInstitutionRepository.findAll();
  }

  async findOne(id: number) {
    return await this.typeFinantialInstitutionRepository.findOneById(id);
  }

  async update(
    id: number,
    updateTypeFinancialInstitutionDto: UpdateTypeFinancialInstitutionDto,
  ) {
    const typeToEdit =
      await this.typeFinantialInstitutionRepository.findOneById(id);

    if (!typeToEdit) {
      throw new NotFoundException('registro no encontrado');
    }

    return await this.typeFinantialInstitutionRepository.save({
      ...typeToEdit,
      ...updateTypeFinancialInstitutionDto,
    });
  }

  async remove(id: number) {
    try {
      const typeToRemove =
        await this.typeFinantialInstitutionRepository.findOne({
          where: { id },
          relations: {
            FinancialInstitutions: true,
          },
        });
      if (!typeToRemove) {
        throw new NotFoundException('registro no encontrado');
      }
      if (typeToRemove.FinancialInstitutions.length > 0) {
        throw new NotFoundException(
          'No se puede eliminar el tipo de institución financiera porque está relacionado con instituciones financieras',
        );
      }
      return await this.typeFinantialInstitutionRepository.remove(typeToRemove);
    } catch (error) {
      throw error;
    }
  }
}

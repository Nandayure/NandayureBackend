import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMunicipalityDto } from './dto/create-municipality.dto';
import { UpdateMunicipalityDto } from './dto/update-municipality.dto';
import { MunicipalityRepository } from './repository/municipality.repository';

@Injectable()
export class MunicipalityService {
  constructor(
    private readonly municipalityGenericRepository: MunicipalityRepository,
  ) {}

  async create(createMunicipalityDto: CreateMunicipalityDto) {
    const municipality = this.municipalityGenericRepository.create(
      createMunicipalityDto,
    );
    return await this.municipalityGenericRepository.save(municipality);
  }

  async getAll() {
    try {
    } catch (e) {}
  }

  async findOne(id: number) {
    return await this.municipalityGenericRepository.findOneById(id);
  }

  async update(id: number, updateMunicipalityDto: UpdateMunicipalityDto) {
    const municipalityToEdit =
      await this.municipalityGenericRepository.findOneById(id);

    if (!municipalityToEdit) {
      throw new BadRequestException('No existe el id de municipalidad:');
    }
    return await this.municipalityGenericRepository.save({
      ...municipalityToEdit,
      ...updateMunicipalityDto,
    });
  }

  async remove(id: number) {
    return `This action removes a #${id} municipality`;
  }
}

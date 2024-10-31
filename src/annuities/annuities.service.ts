import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAnnuityDto } from './dto/create-annuity.dto';
import { UpdateAnnuityDto } from './dto/update-annuity.dto';
import { AnnuityRepository } from './repository/annuity.repository';
import { EmployeesService } from 'src/employees/employees.service';

@Injectable()
export class AnnuitiesService {
  constructor(
    private readonly annuityRepository: AnnuityRepository,
    private readonly employeeRepository: EmployeesService,
  ) {}

  async create(createAnnuityDto: CreateAnnuityDto) {
    const existEmployee = await this.employeeRepository.findOneById(
      createAnnuityDto.EmployeeId,
    );

    if (!existEmployee) {
      throw new BadRequestException('No existe el empleado asociado ');
    }
    this.annuityRepository.create({
      ...createAnnuityDto,
    });

    return await this.annuityRepository.save(createAnnuityDto);
  }

  async findAll() {
    return await this.annuityRepository.findAll({
      relations: { employee: true },
    });
  }

  async findOne(id: number) {
    return await this.annuityRepository.findOneById({
      where: { id },
      relations: { employee: true },
    });
  }

  async update(id: number, updateAnnuityDto: UpdateAnnuityDto) {
    const annuityToEdit = await this.annuityRepository.findOneById(id);

    if (!annuityToEdit) {
      throw new BadRequestException('No existe la anualidad a editar ');
    }

    return this.annuityRepository.save({
      ...annuityToEdit,
      ...updateAnnuityDto,
    });
  }

  async remove(id: number) {
    const annuityToRemove = await this.annuityRepository.findOneById(id);

    if (!annuityToRemove) {
      throw new BadRequestException('No existe la anualidad a eliminar ');
    }
    return this.annuityRepository.remove(annuityToRemove);
  }
}

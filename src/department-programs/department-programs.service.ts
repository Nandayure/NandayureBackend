import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDepartmentProgramDto } from './dto/create-department-program.dto';
import { UpdateDepartmentProgramDto } from './dto/update-department-program.dto';
import { DepartmentProgramRepository } from './repository/DepartmentProgram.repository';

@Injectable()
export class DepartmentProgramsService {
  constructor(
    private readonly departmentProgramRepository: DepartmentProgramRepository,
  ) {}
  async create(createDepartmentProgramDto: CreateDepartmentProgramDto) {
    const newProgram = this.departmentProgramRepository.create(
      createDepartmentProgramDto,
    );

    return await this.departmentProgramRepository.save(newProgram);
  }

  async findAll() {
    return await this.departmentProgramRepository.findAll();
  }

  async findOne(id: number) {
    return await this.departmentProgramRepository.findOneById(id);
  }

  async update(
    id: number,
    updateDepartmentProgramDto: UpdateDepartmentProgramDto,
  ) {
    const programToEdit =
      await this.departmentProgramRepository.findOneById(id);

    if (!programToEdit) {
      throw new NotFoundException('registro no encontrado');
    }

    return await this.departmentProgramRepository.save({
      ...programToEdit,
      ...updateDepartmentProgramDto,
    });
  }

  async remove(id: number) {
    const programToRemove =
      await this.departmentProgramRepository.findOneById(id);

    if (!programToRemove) {
      throw new NotFoundException('registro no encontrado');
    }
    return await this.departmentProgramRepository.remove(programToRemove);
  }
}

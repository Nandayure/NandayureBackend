import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateJobPositionDto } from './dto/create-job-position.dto';
import { UpdateJobPositionDto } from './dto/update-job-position.dto';
import { JobPositionRepository } from './repository/job-position.repository';

@Injectable()
export class JobPositionsService {
  constructor(private readonly jobPositionRepository: JobPositionRepository) {}

  async create(createJobPositionDto: CreateJobPositionDto) {
    const existJobPosition = await this.findOneByName(
      createJobPositionDto.Name,
    );

    if (existJobPosition) {
      throw new ConflictException(
        'Ya existe un puesto de trabajo con ese nombre',
      );
    }

    const newJobPosition =
      this.jobPositionRepository.create(createJobPositionDto);
    return await this.jobPositionRepository.save(newJobPosition);
  }

  async findAll() {
    return this.jobPositionRepository.findAll();
  }

  async findOneByName(Name: string) {
    return this.jobPositionRepository.findByCondition({
      where: { Name: Name },
    });
  }

  async findOneById(id: number) {
    return this.jobPositionRepository.findOneById(id);
  }

  async update(id: number, updateJobPositionDto: UpdateJobPositionDto) {
    const jobPositionToEdit = await this.findOneById(id);

    if (!jobPositionToEdit) {
      throw new BadRequestException('No existe el puesto a editar');
    }

    return this.jobPositionRepository.save({
      ...jobPositionToEdit,
      ...updateJobPositionDto,
    });
  }

  async remove(id: number) {
    try {
      const jobPositionToRemove = await this.jobPositionRepository.findOne({
        where: { id },
        relations: {
          Department: true,
          Employees: true,
        },
      });

      if (!jobPositionToRemove) {
        throw new NotFoundException('No se encontró el registro a eliminar');
      }

      if (jobPositionToRemove.Department.length > 0) {
        throw new NotFoundException(
          'No se puede eliminar el puesto de trabajo porque está relacionado con departamentos',
        );
      }
      if (jobPositionToRemove.Employees.length > 0) {
        throw new NotFoundException(
          'No se puede eliminar el puesto de trabajo porque está relacionado con empleados',
        );
      }

      // Check if the job position is ALCALDE or VICEALCALDE or ADMIN DE RECURSO HUMANO
      const isImportantJobPosition =
        jobPositionToRemove.id === 1 ||
        jobPositionToRemove.id === 2 ||
        jobPositionToRemove.id === 3;

      if (isImportantJobPosition) {
        throw new ConflictException(
          'No se puede eliminar un este puesto de trabajo porque es necesario para el funcionamiento del sistema',
        );
      }
      return await this.jobPositionRepository.remove(jobPositionToRemove);
    } catch (error) {
      throw error;
    }
  }
}

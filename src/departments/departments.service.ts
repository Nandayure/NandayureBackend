import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { DepartmentRepository } from './repository/Department.repository';
import { Department } from './entities/department.entity';

@Injectable()
export class DepartmentsService {
  constructor(private readonly departmentRepository: DepartmentRepository) {}

  async create(createDepartmentDto: CreateDepartmentDto) {
    const newDepartment = this.departmentRepository.create(createDepartmentDto);

    return await this.departmentRepository.save(newDepartment);
  }

  async findAll() {
    return await this.departmentRepository.findAll({
      relations: { departmentHead: true },
    });
  }

  async findOne(id: number) {
    return await this.departmentRepository.findOneById(id);
  }
  async findOneByName(name: string) {
    return await this.departmentRepository.findOne({ where: { name } });
  }

  async update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    const departmentToEdit = await this.departmentRepository.findOneById(id);

    if (!departmentToEdit) {
      throw new NotFoundException('Registro no encontrado');
    }

    return await this.departmentRepository.save({
      ...departmentToEdit,
      ...updateDepartmentDto,
    });
  }

  async remove(id: number) {
    try {
      const departmentToRemove = await this.departmentRepository.findOne({
        where: { id },
        relations: {
          departmentProgram: true,
          JobPosition: true,
          BudgetCode: true,
          departmentHead: true,
        },
      });

      if (!departmentToRemove) {
        throw new NotFoundException('Registro no encontrado');
      }

      if (departmentToRemove.JobPosition.length > 0) {
        throw new BadRequestException(
          'No se puede eliminar el departamento porque está relacionado con otros puestos de trabajo.',
        );
      }
      return await this.departmentRepository.remove(departmentToRemove);
    } catch (error) {
      throw error;
    }
  }

  async validateDepartmentHead(department: Department) {
    if (!department.departmentHeadId) {
      throw new NotFoundException(
        `El departamento ${department.name} no tiene jefe asignado`,
      );
    }
  }
}

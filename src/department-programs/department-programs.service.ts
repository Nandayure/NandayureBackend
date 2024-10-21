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
    try {
      // Usar findOne con opciones de consulta, incluyendo relaciones
      const programToRemove = await this.departmentProgramRepository.findOne({
        where: { id },
        relations: ['Departments'], // Asegúrate de cargar la relación con Departments
      });

      if (!programToRemove) {
        throw new NotFoundException('Registro no encontrado');
      }

      // Verificar si el programa tiene departamentos asociados
      if (
        programToRemove.Departments &&
        programToRemove.Departments.length > 0
      ) {
        throw new Error(
          'No se puede eliminar el programa porque está relacionado con departamentos',
        );
      }

      // Eliminar el programa si no tiene departamentos asociados
      return await this.departmentProgramRepository.remove(programToRemove);
    } catch (error) {
      // Controlar y lanzar la excepción apropiada
      throw new NotFoundException(
        error.message || 'Error interno del servidor',
      );
    }
  }
}

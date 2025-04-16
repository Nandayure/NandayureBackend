import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { DepartmentRepository } from './repository/Department.repository';
import { Department } from './entities/department.entity';
import { UpdateDepartmentHeadDto } from './dto/update-department-head.dto';
import { EmployeesService } from 'src/employees/employees.service';
import { DataSource } from 'typeorm';
import { Employee } from 'src/employees/entities/employee.entity';

@Injectable()
export class DepartmentsService {
  constructor(
    private readonly departmentRepository: DepartmentRepository,
    private readonly employeesService: EmployeesService,
    private readonly dataSource: DataSource,
  ) {}

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
    const departmentToRemove = await this.departmentRepository.findOne({
      where: { id },
      relations: {
        departmentProgram: true,
        JobPosition: true,
        departmentHead: true,
      },
    });

    if (!departmentToRemove) {
      throw new NotFoundException('Registro no encontrado');
    }

    // Check if the department is ADMINISTRACION or RRHH

    if (departmentToRemove.JobPosition.length > 0) {
      throw new BadRequestException(
        'No se puede eliminar el departamento porque está relacionado con otros puestos de trabajo.',
      );
    }
    const isImportantDepartment =
      departmentToRemove.id === 1 || departmentToRemove.id === 3;

    if (isImportantDepartment) {
      throw new BadRequestException(
        'No se puede eliminar este departamento porque es necesario para el funcionamiento de la aplicación.',
      );
    }
    return await this.departmentRepository.remove(departmentToRemove);
  }

  async updateDepartmentHead(
    departmentId: number,
    updateDepartmentHeadDto: UpdateDepartmentHeadDto,
  ) {
    // 1. Create a new transaction
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const employeeTransactionRepo =
        queryRunner.manager.getRepository(Employee);
      const userRolesTransactionRepo =
        queryRunner.manager.getRepository('user_roles');
      const departmentTransactionRepo =
        queryRunner.manager.getRepository(Department);

      const departmentToEdit = await departmentTransactionRepo.findOne({
        where: { id: departmentId },
        relations: {
          departmentHead: true,
        },
      });

      // const lastHeadId = departmentToEdit.departmentHeadId;

      if (!departmentToEdit) {
        throw new NotFoundException('Departamento no encontrado');
      }

      const currentHeadId = departmentToEdit.departmentHeadId;

      const newHeadId =
        updateDepartmentHeadDto.departmentHeadId?.trim() || null;

      if (!currentHeadId && !newHeadId) {
        return { message: 'El departamento ya no tiene jefe asignado' };
      }

      if (currentHeadId === newHeadId) {
        return {
          message:
            'No se realizaron cambios. El jefe de departamento ya estaba asignado.',
          departmentId: departmentToEdit.id,
          currentHeadId,
        };
      }

      //Delete the department head role to the last department head
      if (currentHeadId !== null) {
        //Remove the department head role from the last department head
        await userRolesTransactionRepo.delete({
          userId: currentHeadId,
          roleId: 5,
        });
      }

      if (newHeadId === null) {
        //Remove the department head from the department
        departmentToEdit.departmentHeadId = null;
        departmentToEdit.departmentHead = null;
      } else {
        //Validate if the employee is already a department head in another department
        const employee = await employeeTransactionRepo.findOne({
          where: {
            id: updateDepartmentHeadDto.departmentHeadId,
            JobPosition: { DepartmentId: departmentId },
          },
        });

        if (!employee) {
          throw new NotFoundException(
            'Empleado no pertenece al departamento al que se le quiere asignar como jefe',
          );
        }

        const departmentHead = await departmentTransactionRepo.findOne({
          where: { departmentHeadId: employee.id },
        });

        if (departmentHead && departmentHead.id !== departmentId) {
          throw new BadRequestException(
            'El empleado ya es jefe de otro departamento',
          );
        }

        //Assign the new department head to the department
        departmentToEdit.departmentHeadId =
          updateDepartmentHeadDto.departmentHeadId;

        departmentToEdit.departmentHead = employee; // Assign the employee entity to the departmentHead property

        //Add the role to the new department head
        const existing = await userRolesTransactionRepo.findOneBy({
          userId: updateDepartmentHeadDto.departmentHeadId,
          roleId: 5,
        });

        if (!existing) {
          await userRolesTransactionRepo.insert({
            userId: updateDepartmentHeadDto.departmentHeadId,
            roleId: 5,
          });
        }
      }
      await departmentTransactionRepo.save(departmentToEdit);

      await queryRunner.commitTransaction();
      return {
        message: 'Jefe de departamento actualizado correctamente',
        departmentId: departmentToEdit.id,
        previousHeadId: currentHeadId,
        newHeadId,
      };
    } catch (error) {
      // Rollback the transaction in case of error
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
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

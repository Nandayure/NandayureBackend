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
import { DataSource, Repository } from 'typeorm';
import { Employee } from 'src/employees/entities/employee.entity';
import { RequestApproval } from 'src/request-approvals/entities/request-approval.entity';
import { User } from 'src/users/entities/user.entity';
import { MailClientService } from 'src/mail-client/mail-client.service';

@Injectable()
export class DepartmentsService {
  constructor(
    private readonly departmentRepository: DepartmentRepository,
    private readonly mailClient: MailClientService,
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

    const employeeTransactionRepo = queryRunner.manager.getRepository(Employee);
    const userRolesTransactionRepo =
      queryRunner.manager.getRepository('user_roles');
    const usersTransactionRepo = queryRunner.manager.getRepository(User);
    const departmentTransactionRepo =
      queryRunner.manager.getRepository(Department);
    const approvalsTransactionRepo =
      queryRunner.manager.getRepository(RequestApproval);
    let newEmployeeDepartmentHead: Employee | null = null;

    try {
      const departmentToEdit = await this.validateDepartmentExist({
        departmentTransactionRepo,
        departmentId,
      });

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

      if (newHeadId === null) {
        //Remove the department head from the department
        departmentToEdit.departmentHeadId = null;
        departmentToEdit.departmentHead = null;
      } else {
        newEmployeeDepartmentHead = await this.validateNewDepartmentHead({
          employeeTransactionRepo,
          departmentTransactionRepo,
          newHeadId,
          departmentId,
        });

        //Assign the new department head to the department
        departmentToEdit.departmentHeadId =
          updateDepartmentHeadDto.departmentHeadId;

        departmentToEdit.departmentHead = newEmployeeDepartmentHead; // Assign the employee entity to the departmentHead property
      }
      await departmentTransactionRepo.save(departmentToEdit);
      await this.updateRoles({
        currentHeadId,
        newHeadId,
        departmentId,
        userRolesTransactionRepo,
        usersTransactionRepo,
      });
      const currentApprovals = await this.reassignApprovalProcesses({
        approvalsTransactionRepo,
        previousHeadId: currentHeadId,
        newHeadId,
      });

      //Send mail to the new department head to notify about the new role and the number of approvals assigned to him/her

      if (newEmployeeDepartmentHead) {
        this.mailClient.sendNewDepartmentHeadMail({
          newHeadEmail: newEmployeeDepartmentHead.Email,
          newHeadName: `${newEmployeeDepartmentHead.Name} ${newEmployeeDepartmentHead.Surname1}`,
          departmentName: departmentToEdit.name,
          pendingRequestsCount: currentApprovals,
        });
      }

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
      console.log(error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async updateRoles({
    currentHeadId,
    newHeadId,
    departmentId,
    usersTransactionRepo,
    userRolesTransactionRepo,
  }: {
    currentHeadId?: string;
    newHeadId?: string;
    departmentId: number;
    usersTransactionRepo: Repository<User>;
    userRolesTransactionRepo: Repository<any>;
  }) {
    const DEPARTMENT_HEAD_ROLE_ID = 5;
    // const VA_ROLE_ID = 4;
    const RRHH_ROLE_ID = 3;
    const TI_ROLE_ID = 2;

    if (currentHeadId && !newHeadId) {
      //Remove the department head role from the last department head
      await userRolesTransactionRepo.delete({
        userId: currentHeadId,
        roleId: DEPARTMENT_HEAD_ROLE_ID,
      });

      //Delete VHR role from the last department head if the department is Administracion
      // if (departmentId === 1) {
      //   await userRolesTransactionRepo.delete({
      //     userId: currentHeadId,
      //     roleId: VA_ROLE_ID,
      //   });
      // }

      //Delete VHR role from the last department head if the department is RRHH
      if (departmentId === 3) {
        await userRolesTransactionRepo.delete({
          userId: currentHeadId,
          roleId: RRHH_ROLE_ID,
        });
      }
      //Delete TI role from the last department head if the department is TI
      if (departmentId === 2) {
        await userRolesTransactionRepo.delete({
          userId: currentHeadId,
          roleId: TI_ROLE_ID,
        });
      }
    }

    if (!newHeadId) {
      return;
    }

    const { Roles: currentRolesOfNewHead } = await usersTransactionRepo.findOne(
      {
        where: { id: newHeadId },
        relations: { Roles: true },
      },
    );

    // Check if the new department head already has the DEPARTMENT_HEAD_ROLE_ID
    const hasRole = (role: number) =>
      currentRolesOfNewHead?.some((r) => r.id === role);

    // If the new department head doesn't have the role, assign it
    if (!hasRole(DEPARTMENT_HEAD_ROLE_ID)) {
      await userRolesTransactionRepo.insert({
        userId: newHeadId,
        roleId: DEPARTMENT_HEAD_ROLE_ID,
      });
    }

    // if (departmentId === 1 && !hasRole(VA_ROLE_ID)) {
    //   await userRolesTransactionRepo.insert({
    //     userId: newHeadId,
    //     roleId: VA_ROLE_ID,
    //   });
    // }

    if (departmentId === 3 && !hasRole(RRHH_ROLE_ID)) {
      await userRolesTransactionRepo.insert({
        userId: newHeadId,
        roleId: RRHH_ROLE_ID,
      });
    }

    if (departmentId === 2 && !hasRole(TI_ROLE_ID)) {
      await userRolesTransactionRepo.insert({
        userId: newHeadId,
        roleId: TI_ROLE_ID,
      });
    }
  }

  async validateNewDepartmentHead({
    employeeTransactionRepo,
    departmentTransactionRepo,
    newHeadId,
    departmentId,
  }: {
    employeeTransactionRepo: Repository<Employee>;
    departmentTransactionRepo: Repository<Department>;
    newHeadId: string;
    departmentId: number;
  }) {
    const employee = await employeeTransactionRepo.findOne({
      where: {
        id: newHeadId,
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

    return employee;
  }

  async validateDepartmentExist({
    departmentTransactionRepo,
    departmentId,
  }: {
    departmentTransactionRepo: Repository<Department>;
    departmentId: number;
  }) {
    const departmentToEdit = await departmentTransactionRepo.findOne({
      where: { id: departmentId },
      relations: {
        departmentHead: true,
      },
    });

    if (!departmentToEdit) {
      throw new NotFoundException('Departamento no encontrado');
    }

    return departmentToEdit;
  }

  async validateDepartmentHead(department: Department) {
    if (!department.departmentHeadId) {
      throw new NotFoundException(
        `El departamento ${department.name} no tiene jefe asignado`,
      );
    }
  }

  async reassignApprovalProcesses({
    approvalsTransactionRepo,
    previousHeadId,
    newHeadId,
  }: {
    approvalsTransactionRepo: Repository<RequestApproval>;
    previousHeadId: string;
    newHeadId: string;
  }) {
    let currentApprovals = 0;
    const approvalsToUpdate = await approvalsTransactionRepo
      .createQueryBuilder('approvals')
      .leftJoinAndSelect('approvals.Request', 'request')
      .where('approvals.approverId = :previousHeadId', {
        previousHeadId,
      })
      .andWhere('approvals.approved IS NULL')
      .andWhere('request.RequestStateId = 1')
      .getMany();

    if (approvalsToUpdate.length === 0) {
      return currentApprovals;
    }

    currentApprovals = approvalsToUpdate.filter(
      (a) => a.current === true,
    ).length;

    for (const approval of approvalsToUpdate) {
      approval.approverId = newHeadId;
    }
    await approvalsTransactionRepo.save(approvalsToUpdate);

    return currentApprovals;
  }
}

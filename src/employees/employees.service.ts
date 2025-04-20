import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { UsersService } from 'src/users/users.service';
import { EmployeeRepository } from './repository/employee.repository';
import { MaritalStatusService } from 'src/marital-status/marital-status.service';
import { GendersService } from 'src/genders/genders.service';
import { DataSource, IsNull, Not } from 'typeorm';
import { JobPositionsService } from 'src/job-positions/job-positions.service';
import { GoogleDriveFilesService } from 'src/google-drive-files/google-drive-files.service';
import { DriveFolderRepository } from 'src/drive-folder/repository/drive-folder.repository';
import { UpdateEmployeeJobPosition } from './dto/updateEmployeeJobPosition';
import { Employee } from './entities/employee.entity';
import { User } from 'src/users/entities/user.entity';
import { DriveFolder } from 'src/drive-folder/entities/drive-folder.entity';
import { RequestVacation } from 'src/request-vacation/entities/request-vacation.entity';
import { RequestSalaryCertificate } from 'src/request-salary-certificates/entities/request-salary-certificate.entity';
import { RequestPaymentConfirmation } from 'src/request-payment-confirmations/entities/request-payment-confirmation.entity';
import { RequestApproval } from 'src/request-approvals/entities/request-approval.entity';
import { Request } from 'src/requests/entities/request.entity';
import { GetEmployeesFilterDto } from './dto/get-employees-filter.dto';

@Injectable()
export class EmployeesService {
  constructor(
    private readonly employeeRepository: EmployeeRepository,
    private readonly userService: UsersService,
    private readonly maritalStatusService: MaritalStatusService,
    private readonly genderService: GendersService,
    private readonly jobPositionService: JobPositionsService,
    private readonly googleDriveFilesService: GoogleDriveFilesService,
    private readonly driveFolderRepository: DriveFolderRepository,
    private dataSource: DataSource,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    // const userRolesTransactionRepo =
    //   queryRunner.manager.getRepository('user_roles');
    // const userTransactionRepo = queryRunner.manager.getRepository(User);
    try {
      await this.validateDataToCreate(createEmployeeDto);

      const newEmployee = this.employeeRepository.create(createEmployeeDto);

      const created = await queryRunner.manager.save(newEmployee);

      await this.userService.create(
        {
          id: created.id,
          Email: createEmployeeDto.Email,
        },
        queryRunner,
        createEmployeeDto.JobPositionId,
      );
      const employeeWholeName = `${created.Name} ${created.Surname1}`;

      const folder = await this.googleDriveFilesService.createMainFolder(
        newEmployee.id,
        employeeWholeName,
      );

      const newDriveFolder = this.driveFolderRepository.create({
        id: created.id,
        FolderId: folder,
      });

      await queryRunner.manager.save(newDriveFolder);

      await queryRunner.commitTransaction();

      return created;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      if (error instanceof ConflictException) {
        throw error;
      }
      // Manejo de cualquier otra excepción no prevista
      throw new InternalServerErrorException({
        error: 'Error en la creación del usuario: ' + error.message,
      });
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(getEmployeesFilterDto: GetEmployeesFilterDto) {
    const page = Number(getEmployeesFilterDto.page ?? 1);
    const limit = Number(getEmployeesFilterDto.limit ?? 10);

    const [data, totalItems] =
      await this.employeeRepository.findAllEmployeesWithFilters(
        getEmployeesFilterDto,
      );

    const totalPages = Math.ceil(totalItems / limit);

    return {
      data,
      page,
      limit,
      totalItems,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    };
  }

  async findOneById(id: string) {
    return await this.employeeRepository.findOneById(id);
  }

  async findMayor() {
    return await this.employeeRepository.findOne({
      where: { JobPositionId: 1 },
      relations: {
        User: {
          Roles: true,
        },
      },
    });
  }

  async findRequester(employeeId: string) {
    return await this.employeeRepository.findOne({
      where: { id: employeeId },
      relations: {
        User: {
          Roles: true,
        },
      },
    });
  }

  async findOneByEmail(email: string) {
    return await this.employeeRepository.findOne({
      where: { Email: email },
    });
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const employeeToEdit = await this.findOneById(id);
    if (!employeeToEdit) {
      throw new NotFoundException(
        'No existe el usuario con número de cédula: ',
      );
    }

    await this.validateDataToUpdate(updateEmployeeDto);

    return this.employeeRepository.save({
      ...employeeToEdit,
      ...updateEmployeeDto,
    });
  }

  async validateDataToCreate(dto: CreateEmployeeDto) {
    await this.validateEmployeeId(dto.id);
    await this.validateEmployeeEmail(dto.Email);
    await this.validateMaritalStatus(dto.MaritalStatusId);
    await this.validateGender(dto.GenderId);
    await this.validateJobPosition(dto.JobPositionId, dto.id);
  }

  async validateDataToUpdate(dto: UpdateEmployeeDto) {
    if (dto.MaritalStatusId) {
      await this.validateMaritalStatus(dto.MaritalStatusId);
    }

    if (dto.GenderId) {
      await this.validateGender(dto.GenderId);
    }

    // if (dto.JobPositionId) {
    //   await this.validateJobPosition(dto.JobPositionId);
    // }

    if (dto.Email) {
      await this.validateEmployeeEmail(dto.Email);
    }
  }

  async validateEmployeeId(id: string) {
    const existEmployee = await this.findOneById(id);
    if (existEmployee) {
      throw new NotFoundException(
        'Ya existe un empleado con ese número de identificación',
      );
    }
  }

  async validateEmployeeEmail(email: string) {
    const existEmployeeWithMail = await this.findOneByEmail(email);
    if (existEmployeeWithMail) {
      throw new ConflictException(
        'Ya existe un registro con esa dirección de correo electrónico',
      );
    }
  }

  async validateMaritalStatus(maritalStatusId: number) {
    const existMaritalStatus =
      await this.maritalStatusService.findOneById(maritalStatusId);
    if (!existMaritalStatus) {
      throw new ConflictException('No existe el estado civil seleccionado');
    }
  }

  async validateGender(genderId: number) {
    const existGender = await this.genderService.findOneById(genderId);
    if (!existGender) {
      throw new ConflictException('No existe el género seleccionado');
    }
  }
  async validateJobPosition(JobPositionId: number, employeeId: string) {
    const existJobPosition =
      await this.jobPositionService.findOneById(JobPositionId);
    if (!existJobPosition) {
      throw new ConflictException('No existe el puesto seleccionado');
    }

    const restrictedPositions = [1, 2];

    if (restrictedPositions.includes(JobPositionId)) {
      const existEmployeeInThisJobPosition =
        await this.employeeRepository.findOne({
          where: { JobPositionId },
        });

      if (
        existEmployeeInThisJobPosition &&
        existEmployeeInThisJobPosition.id !== employeeId
      ) {
        throw new ConflictException(
          'No se puede asignar más de un empleado a este puesto',
        );
      }
    }
  }

  async updateEmployeeJobPosition(
    employeeId: string,
    updateEmployeeJobPosition: UpdateEmployeeJobPosition,
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

      const existEmployee = await employeeTransactionRepo.findOneBy({
        id: employeeId,
      });

      const currentJobPositionId = existEmployee.JobPositionId;
      const newJobPositionId = updateEmployeeJobPosition.JobPositionId;

      if (!existEmployee) {
        throw new NotFoundException('El empleado no existe o ya fue eliminado');
      }

      if (currentJobPositionId === newJobPositionId) {
        return { message: 'El puesto de trabajo es el mismo que el actual' };
      }

      await this.validateJobPosition(newJobPositionId, employeeId);

      const updatedEmployee = await employeeTransactionRepo.save({
        ...existEmployee,
        JobPositionId: newJobPositionId,
      });

      const VA_ROLE_ID = 4;
      const positionsWithVArole = [1, 2];

      if (
        positionsWithVArole.includes(currentJobPositionId) &&
        !positionsWithVArole.includes(newJobPositionId)
      ) {
        await userRolesTransactionRepo.delete({
          userId: employeeId,
          roleId: VA_ROLE_ID,
        });
      }
      if (
        !positionsWithVArole.includes(currentJobPositionId) &&
        positionsWithVArole.includes(newJobPositionId)
      ) {
        await userRolesTransactionRepo.upsert(
          {
            userId: employeeId,
            roleId: VA_ROLE_ID,
          },
          ['userId', 'roleId'],
        );
      }

      await queryRunner.commitTransaction();

      return updatedEmployee;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.log('error', error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async validateExistEmployeeId(id: string) {
    const existEmployee = await this.findOneById(id);
    if (!existEmployee) {
      throw new ConflictException(
        'No existe un empleado con ese número de identificación',
      );
    }
  }

  async updateVacationDays(id: string, requestedDays: number) {
    const existEmployee = await this.findOneById(id);
    if (!existEmployee) {
      throw new ConflictException(
        'No existe un empleado con ese número de identificación',
      );
    }

    if (existEmployee.AvailableVacationDays < requestedDays) {
      throw new ConflictException(
        'No tiene suficientes días de vacaciones disponibles',
      );
    }
    existEmployee.AvailableVacationDays -= requestedDays;

    return await this.employeeRepository.save(existEmployee);
  }

  async validateAvaiableVacationsDays(id: string, requestedDays: number) {
    const existEmployee = await this.findOneById(id);
    if (!existEmployee) {
      throw new NotFoundException(
        'No existe un empleado con ese número de identificación',
      );
    }

    if (existEmployee.AvailableVacationDays < requestedDays) {
      throw new ConflictException(
        'No tiene suficientes días de vacaciones disponibles',
      );
    }
  }

  async getEmployeeDepartment(id: string) {
    const employeeWithDepartment = await this.employeeRepository.findOne({
      where: { id },
      relations: {
        JobPosition: { Department: true },
      },
    });

    if (!employeeWithDepartment) {
      throw new ConflictException('No existe un empleado con ese id');
    }
    return employeeWithDepartment.JobPosition.Department;
  }

  async delete(id: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const employeeTransactionRepo =
        queryRunner.manager.getRepository(Employee);
      const requestTransactionRepo = queryRunner.manager.getRepository(Request);

      const employeeToDelete = await employeeTransactionRepo.findOne({
        where: { id },
        relations: {
          User: true,
          DriveFolder: true,
          requests: {
            RequestVacation: true,
            RequestSalaryCertificate: true,
            RequestPaymentConfirmation: true,
            RequestApprovals: true,
          },
        },
      });
      if (!employeeToDelete) {
        throw new NotFoundException('El usuario no existe o ya fue elmininado');
      }

      const canceledStatusId = 4;
      const canceledReason =
        'La solicitud fue cancelada automáticamente por el sistema debido a la eliminación del empleado';
      for (const request of employeeToDelete.requests || []) {
        //IF request is in process or pending then cancel it
        if (request.RequestStateId === 1) {
          await requestTransactionRepo.save({
            ...request,
            RequestStateId: canceledStatusId,
            CancelledReason: canceledReason,
          });
        }
      }
      await employeeTransactionRepo.softRemove(employeeToDelete);

      await queryRunner.commitTransaction();

      return { message: 'Empleado eliminado correctamente' };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    }
  }

  async getEmployeesDeleted() {
    const deletedEmployees = await this.employeeRepository.findDeleted();

    console.log('deletedEmployees', deletedEmployees);
    if (deletedEmployees.length === 0) {
      return { message: 'No hay empleados eliminados' };
    }
    return deletedEmployees;
  }

  async restore(id: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const employeeTransactionRepo =
        queryRunner.manager.getRepository(Employee);
      const userTransactionRepo = queryRunner.manager.getRepository(User);
      const driveFolderTransactionRepo =
        queryRunner.manager.getRepository(DriveFolder);
      const requestTransactionRepo = queryRunner.manager.getRepository(Request);
      const vacationRepo = queryRunner.manager.getRepository(RequestVacation);
      const salaryRepo = queryRunner.manager.getRepository(
        RequestSalaryCertificate,
      );
      const paymentRepo = queryRunner.manager.getRepository(
        RequestPaymentConfirmation,
      );
      const approvalRepo = queryRunner.manager.getRepository(RequestApproval);

      const employeeToRestore = await employeeTransactionRepo.findOne({
        where: { id, deletedAt: Not(IsNull()) },
        withDeleted: true,
        relations: {
          User: true,
          DriveFolder: true,
          requests: {
            RequestVacation: true,
            RequestSalaryCertificate: true,
            RequestPaymentConfirmation: true,
            RequestApprovals: true,
          },
        },
      });

      if (!employeeToRestore) {
        throw new NotFoundException('El empleado no está eliminado');
      }
      await employeeTransactionRepo.restore(employeeToRestore.id);
      if (employeeToRestore.User) {
        await userTransactionRepo.restore(employeeToRestore.User.id);
      }
      if (employeeToRestore.DriveFolder) {
        await driveFolderTransactionRepo.restore(
          employeeToRestore.DriveFolder.id,
        );
      }

      for (const request of employeeToRestore.requests || []) {
        await requestTransactionRepo.restore(request.id);

        if (request.RequestVacation) {
          await vacationRepo.restore(request.RequestVacation.id);
        }

        if (request.RequestSalaryCertificate) {
          await salaryRepo.restore(request.RequestSalaryCertificate.id);
        }

        if (request.RequestPaymentConfirmation) {
          await paymentRepo.restore(request.RequestPaymentConfirmation.id);
        }

        for (const approval of request.RequestApprovals || []) {
          await approvalRepo.restore(approval.id);
        }
      }

      await queryRunner.commitTransaction();

      return { message: 'Empleado restaurado correctamente' };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async getBasicInfoEmployee(id: string) {
    const employees = await this.employeeRepository.findOne({
      where: { id },
      select: {
        id: true,
        Name: true,
        Surname1: true,
        Surname2: true,
        Email: true,
        Birthdate: true,
        HiringDate: true,
        CellPhone: true,
        NumberChlidren: true,
        AvailableVacationDays: true,
      },
    });
    if (!employees) {
      throw new NotFoundException('No hay empleados registrados');
    }
    return employees;
  }

  async getEmployeesByDepartment(departmentId: number) {
    const employees = await this.employeeRepository.findAll({
      where: { JobPosition: { DepartmentId: departmentId } },
      relations: {
        JobPosition: true,
      },
    });

    return employees;
  }

  async getEmployeeAvaibleVacantionsDays(employeeId: string) {
    const employee =
      await this.employeeRepository.getEmployeeAvaibleVacantionsDays(
        employeeId,
      );

    if (!employee) {
      throw new NotFoundException('No existe el empleado con ese id');
    }
    return employee;
  }
}

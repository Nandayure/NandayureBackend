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

  async findAll() {
    try {
      return await this.employeeRepository.findAll();
    } catch (error) {
      throw new InternalServerErrorException(
        error,
        'Error al obtener información de los empleados',
      );
    }
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
  }

  async validateDataToUpdate(dto: UpdateEmployeeDto) {
    if (dto.MaritalStatusId) {
      await this.validateMaritalStatus(dto.MaritalStatusId);
    }

    if (dto.GenderId) {
      await this.validateGender(dto.GenderId);
    }

    if (dto.JobPositionId) {
      await this.validateJobPosition(dto.JobPositionId);
    }

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
  async validateJobPosition(JobPositionId: number) {
    const existGender =
      await this.jobPositionService.findOneById(JobPositionId);
    if (!existGender) {
      throw new ConflictException('No existe el puesto seleccionado');
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
    const employeeToDelete = await this.employeeRepository.findOne({
      where: { id },
      relations: ['User'], // 🧠 ¡esto es clave!
    });
    if (!employeeToDelete) {
      throw new NotFoundException('El usuario no existe o ya fue elmininado');
    }
    return this.employeeRepository.softDelete(employeeToDelete);
  }

  async getEmployeesDeleted() {
    const deletedEmployees = await this.employeeRepository.findDeleted();

    console.log('deletedEmployees', deletedEmployees);
    if (deletedEmployees.length === 0) {
      throw new NotFoundException('No hay empleados eliminados');
    }
    return deletedEmployees;
  }

  async restore(id: string) {
    const employeeToRestore = await this.employeeRepository.findOne({
      where: { id, deletedAt: Not(IsNull()) },
      withDeleted: true,
      relations: ['User'],
    });
    if (!employeeToRestore) {
      throw new NotFoundException('El empleado no está eliminado');
    }
    await this.employeeRepository.restore(employeeToRestore.id);
    await this.userService.restore(employeeToRestore.User.id);

    return { message: 'Empleado restaurado correctamente' };
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
      },
    });
    if (!employees) {
      throw new NotFoundException('No hay empleados registrados');
    }
    return employees;
  }
}

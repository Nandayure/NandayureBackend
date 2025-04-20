import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { Employee } from '../entities/employee.entity';
import { BaseAbstractRepostitory } from 'src/core/generic-repository/repository/base.repository';
import { EmployeeRepositoryInterface } from './employee.interface';
import { GetEmployeesFilterDto } from '../dto/get-employees-filter.dto';

export class EmployeeRepository
  extends BaseAbstractRepostitory<Employee>
  implements EmployeeRepositoryInterface
{
  constructor(
    @InjectRepository(Employee)
    private readonly employeeGenericRepository: Repository<Employee>,
  ) {
    super(employeeGenericRepository);
  }

  async softRemove(employeeToRemove: Employee) {
    const deleted =
      await this.employeeGenericRepository.softRemove(employeeToRemove);

    if (!deleted) {
      throw new Error('Error al eliminar el empleado');
    }
    return { message: 'Empleado eliminado correctamente' };
  }

  async findDeleted(): Promise<Employee[]> {
    const response = await this.employeeGenericRepository.find({
      withDeleted: true,
      where: {
        deletedAt: Not(IsNull()),
      },
    });
    console.log('response', response);
    return response;
  }

  async restore(id: string) {
    const restored = await this.employeeGenericRepository.restore(id);
    if (!restored) {
      throw new Error('Error al restaurar el empleado');
    }
    return { message: 'Empleado restaurado correctamente' };
  }

  getEmployeeAvaibleVacantionsDays(employeeId: string) {
    return this.employeeGenericRepository
      .createQueryBuilder('employee')
      .select('employee.id')
      .addSelect('employee.Name')
      .addSelect('employee.AvailableVacationDays')
      .where('employee.id = :id', { id: employeeId })
      .getOne();
  }

  async findAllEmployeesWithFilters(
    getEmployeesFilterDto: GetEmployeesFilterDto,
  ): Promise<[Employee[], number]> {
    const {
      page = 1,
      limit = 5,
      name,
      surname1,
      surname2,
      email,
      genderId,
      maritalStatusId,
    } = getEmployeesFilterDto;

    const take = Number(limit);
    const skip = (Number(page) - 1) * take;

    const query = this.employeeGenericRepository
      .createQueryBuilder('employee')
      .leftJoin('employee.JobPosition', 'jobPosition')
      .leftJoin('jobPosition.Department', 'department')
      .leftJoin('employee.Gender', 'gender')
      .leftJoin('employee.MaritalStatus', 'maritalStatus')
      .select([
        'employee.id',
        'employee.Name',
        'employee.Surname1',
        'employee.Surname2',
        'employee.Email',
        'employee.AvailableVacationDays',
        'employee.NumberChlidren',
        'gender.Name',
        'maritalStatus.Name',
        'employee.CellPhone',
        'employee.HiringDate',
        'employee.Birthdate',
        'jobPosition.id', // necesario para que JobPosition se cree como objeto
        'jobPosition.Name',

        'department.id', // necesario para que Department se cree como objeto
        'department.name',
      ])
      .orderBy('employee.Name', 'ASC')
      .skip(skip)
      .take(take);

    if (name) {
      query.andWhere('LOWER(employee.Name) LIKE :name', {
        name: `%${name.toLowerCase()}%`,
      });
    }
    if (surname1) {
      query.andWhere('LOWER(employee.Surname1) LIKE :surname1', {
        surname1: `%${surname1.toLowerCase()}%`,
      });
    }
    if (surname2) {
      query.andWhere('LOWER(employee.Surname2) LIKE :surname2', {
        surname2: `%${surname2.toLowerCase()}%`,
      });
    }
    if (email) {
      query.andWhere('LOWER(employee.Email) LIKE :email', {
        email: `%${email.toLowerCase()}%`,
      });
    }
    if (genderId) {
      query.andWhere('employee.GenderId = :genderId', {
        genderId: genderId,
      });
    }
    if (maritalStatusId) {
      query.andWhere('employee.MaritalStatusId = :maritalStatusId', {
        maritalStatusId: maritalStatusId,
      });
    }

    const [data, totalItems] = await query.getManyAndCount();

    return [data, totalItems];
  }
}

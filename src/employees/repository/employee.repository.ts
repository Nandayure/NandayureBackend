import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { Employee } from '../entities/employee.entity';
import { BaseAbstractRepostitory } from 'src/core/generic-repository/repository/base.repository';
import { EmployeeRepositoryInterface } from './employee.interface';

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
}

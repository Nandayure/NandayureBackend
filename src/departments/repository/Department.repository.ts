import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from '../entities/department.entity';
import { BaseAbstractRepostitory } from 'src/core/generic-repository/repository/base.repository';
import { DepartmentProgramInterfaceRepository } from './Department.interface';
import { GetDepartmentsFilterDto } from '../dto/get-departments-fiter.dto';

export class DepartmentRepository
  extends BaseAbstractRepostitory<Department>
  implements DepartmentProgramInterfaceRepository
{
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) {
    super(departmentRepository);
  }

  async getDepartmentsWithFilter(
    getDepartmentsFilterDto: GetDepartmentsFilterDto,
  ): Promise<[Department[], number]> {
    const { id, name, limit = 5, page = 1 } = getDepartmentsFilterDto;

    const take = Number(limit);
    const skip = (Number(page) - 1) * take;

    const query = this.departmentRepository
      .createQueryBuilder('department')
      .leftJoin('department.departmentHead', 'departmentHead')
      .leftJoin('department.departmentProgram', 'departmentProgram')
      .select([
        'department.id',
        'department.name',
        'department.description',
        'departmentHead.id',
        'departmentHead.Name',
        'departmentHead.Surname1',
        'departmentHead.Surname2',
        'departmentHead.Email',
        'departmentHead.CellPhone',
        'departmentProgram.id',
        'departmentProgram.name',
      ])
      .orderBy('department.name', 'ASC')
      .skip(skip)
      .take(take);

    if (id) {
      query.andWhere('department.id = :id', { id });
    }

    if (name) {
      query.andWhere('department.name LIKE :name', {
        name: `${name}%`,
      });
    }

    const [departments, total] = await query.getManyAndCount();
    return [departments, total];
  }
}

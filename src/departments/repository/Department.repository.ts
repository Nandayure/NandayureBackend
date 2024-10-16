import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from '../entities/department.entity';
import { BaseAbstractRepostitory } from 'src/core/generic-repository/repository/base.repository';
import { DepartmentProgramInterfaceRepository } from './Department.interface';

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
}

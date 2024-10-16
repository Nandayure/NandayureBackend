import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DepartmentProgram } from '../entities/department-program.entity';
import { BaseAbstractRepostitory } from 'src/core/generic-repository/repository/base.repository';
import { DepartmentProgramInterfaceRepository } from './DepartmentProgram.interface';

export class DepartmentProgramRepository
  extends BaseAbstractRepostitory<DepartmentProgram>
  implements DepartmentProgramInterfaceRepository
{
  constructor(
    @InjectRepository(DepartmentProgram)
    private readonly departmentProgramRepository: Repository<DepartmentProgram>,
  ) {
    super(departmentProgramRepository);
  }
}

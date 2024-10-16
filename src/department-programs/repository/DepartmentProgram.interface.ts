import { BaseAbstractRepostitory } from 'src/core/generic-repository/repository/base.repository';
import { DepartmentProgram } from '../entities/department-program.entity';

export interface DepartmentProgramInterfaceRepository
  extends BaseAbstractRepostitory<DepartmentProgram> {}

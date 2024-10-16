import { BaseAbstractRepostitory } from 'src/core/generic-repository/repository/base.repository';
import { Department } from '../entities/department.entity';

export interface DepartmentProgramInterfaceRepository
  extends BaseAbstractRepostitory<Department> {}

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { BaseAbstractRepostitory } from 'src/core/generic-repository/repository/base.repository';
import { UserRepositoryInterface } from './user.interface';

export class UserRepository
  extends BaseAbstractRepostitory<User>
  implements UserRepositoryInterface
{
  constructor(
    @InjectRepository(User)
    private readonly userGenericRepository: Repository<User>,
  ) {
    super(userGenericRepository);
  } // Puedes agregar aquí métodos específicos para User si es necesario

  async restore(id: string) {
    return await this.userGenericRepository.restore(id);
  }

  async findAvaibleUsers() {
    return await this.userGenericRepository
      .createQueryBuilder('user')
      .select('user.id', 'userId')
      .addSelect('user.enabled', 'enabled')
      .addSelect('employee.Name', 'name')
      .addSelect('employee.Surname1', 'surname1')
      .addSelect('employee.Surname2', 'surname2')
      .addSelect('employee.Email', 'email')
      .addSelect('employee.CellPhone', 'cellPhone')
      .innerJoin('user.Employee', 'employee')
      .where('user.enabled = true')
      .getRawMany();
  }
  async findUnavaibleUsers() {
    return await this.userGenericRepository
      .createQueryBuilder('user')
      .select('user.id', 'userId')
      .addSelect('user.enabled', 'enabled')
      .addSelect('employee.Name', 'name')
      .addSelect('employee.Surname1', 'surname1')
      .addSelect('employee.Surname2', 'surname2')
      .addSelect('employee.Email', 'email')
      .addSelect('employee.CellPhone', 'cellPhone')
      .innerJoin('user.Employee', 'employee')
      .where('user.enabled = false')
      .getRawMany();
  }
}

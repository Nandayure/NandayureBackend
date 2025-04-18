import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { BaseAbstractRepostitory } from 'src/core/generic-repository/repository/base.repository';
import { UserRepositoryInterface } from './user.interface';
import { GetUsersQueryDto } from '../dto/GetUsersQueryDto';

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

  async findAllWithFilters(query: GetUsersQueryDto): Promise<[User[], number]> {
    const { page = 1, limit = 5, name, enabled, id } = query;

    const take = Number(limit);
    const skip = (Number(page) - 1) * take;

    const qb = this.userGenericRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.Employee', 'employee')
      .leftJoinAndSelect('employee.JobPosition', 'jobPosition')
      .leftJoinAndSelect('user.Roles', 'role')
      // .withDeleted() // solo si querés incluir eliminados
      .orderBy('employee.Name', 'ASC')
      .skip(skip)
      .take(take);

    if (id) {
      qb.andWhere('LOWER(user.id) LIKE :id', { id: `%${id.toLowerCase()}%` });
    }

    if (name) {
      qb.andWhere('LOWER(employee.Name) LIKE :name', {
        name: `%${name.toLowerCase()}%`,
      });
    }

    if (enabled !== undefined) {
      qb.andWhere('user.enabled = :enabled', { enabled });
    }

    const [data, totalItems] = await qb.getManyAndCount();
    return [data, totalItems];
  }
}

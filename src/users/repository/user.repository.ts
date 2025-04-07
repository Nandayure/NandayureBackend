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
}

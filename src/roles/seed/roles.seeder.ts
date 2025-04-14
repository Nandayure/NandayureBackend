import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Role } from '../entities/role.entity';
import { defaultRoleData } from '../seed-data/default-data';

export default class RoleSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(Role);

    await repository.insert(defaultRoleData);
  }
}

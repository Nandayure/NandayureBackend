import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Department } from '../entities/department.entity';
import { defaultDepartmentData } from '../seed-data/default-data';

export default class DepartmentSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    await dataSource.query('SET FOREIGN_KEY_CHECKS = 0;');
    await dataSource.query('TRUNCATE `department`;');
    await dataSource.query('SET FOREIGN_KEY_CHECKS = 1;');
    const repository = dataSource.getRepository(Department);
    await repository.insert(defaultDepartmentData);
  }
}

import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { MaritalStatus } from '../entities/marital-status.entity';
import { defaultMaritalStatusData } from '../seed-data/default-data';

export default class MaritalStatusSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    // await dataSource.query('SET FOREIGN_KEY_CHECKS = 0;');
    // await dataSource.query('TRUNCATE `marital_status`;');
    // await dataSource.query('SET FOREIGN_KEY_CHECKS = 1;');
    const repository = dataSource.getRepository(MaritalStatus);

    await repository.insert(defaultMaritalStatusData);
  }
}

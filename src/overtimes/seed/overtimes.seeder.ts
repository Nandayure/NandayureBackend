import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Overtime } from '../entities/overtime.entity';
import { defaultOverTimeData } from '../seed-data/default-data';

export default class OvertimeSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    // await dataSource.query('SET FOREIGN_KEY_CHECKS = 0;');
    // await dataSource.query('TRUNCATE `overtime`;');
    // await dataSource.query('SET FOREIGN_KEY_CHECKS = 1;');
    const repository = dataSource.getRepository(Overtime);

    await repository.insert(defaultOverTimeData);
  }
}

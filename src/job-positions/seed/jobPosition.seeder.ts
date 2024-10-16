import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { JobPosition } from '../entities/job-position.entity';
import { defaultJobPositionsData } from '../seed-data/default-data';

export default class JobPositionSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    await dataSource.query('SET FOREIGN_KEY_CHECKS = 0;');
    await dataSource.query('TRUNCATE `job_position`;');
    await dataSource.query('SET FOREIGN_KEY_CHECKS = 1;');
    const repository = dataSource.getRepository(JobPosition);

    await repository.insert(defaultJobPositionsData);
  }
}

import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Study } from '../entities/study.entity';
import { defaultStudiesData } from '../seed-data/default-data';

export default class StudySeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    await dataSource.query('SET FOREIGN_KEY_CHECKS = 0;');
    await dataSource.query('TRUNCATE `study`;');
    await dataSource.query('SET FOREIGN_KEY_CHECKS = 1;');
    const repository = dataSource.getRepository(Study);

    await repository.insert(defaultStudiesData);
  }
}

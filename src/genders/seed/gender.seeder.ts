import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Gender } from '../entities/gender.entity';
import { defaultGenderData } from '../seed-data/default-data';

export default class GenderSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    await dataSource.query('SET FOREIGN_KEY_CHECKS = 0;');
    await dataSource.query('TRUNCATE `gender`;');
    await dataSource.query('SET FOREIGN_KEY_CHECKS = 1;');
    const repository = dataSource.getRepository(Gender);

    await repository.insert(defaultGenderData);
  }
}

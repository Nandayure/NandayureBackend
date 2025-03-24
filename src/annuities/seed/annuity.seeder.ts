import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Annuity } from '../entities/annuity.entity';
import { defaultAnnuityData } from '../seed-data/default-data';

export default class AnnuitySeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    // await dataSource.query('SET FOREIGN_KEY_CHECKS = 0;');
    // await dataSource.query('TRUNCATE `annuity`;');
    // await dataSource.query('SET FOREIGN_KEY_CHECKS = 1;');
    const repository = dataSource.getRepository(Annuity);

    await repository.insert(defaultAnnuityData);
  }
}

import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Municipality } from 'src/municipality/entities/municipality.entity';
import { defaultMunicipalityData } from '../seed-data/default-data';

export default class MunicipalitySeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    await dataSource.query('TRUNCATE `municipality`;');
    const repository = dataSource.getRepository(Municipality);

    await repository.insert([defaultMunicipalityData]);
  }
}

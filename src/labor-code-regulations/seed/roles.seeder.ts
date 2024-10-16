import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { LaborCodeRegulation } from '../entities/labor-code-regulation.entity';
import { defaultLaborRegulationsData } from '../seed-data/default-data';

export default class LaborCodeRegulationSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    await dataSource.query('SET FOREIGN_KEY_CHECKS = 0;');
    await dataSource.query('TRUNCATE `labor_code_regulation`;');
    await dataSource.query('SET FOREIGN_KEY_CHECKS = 1;');
    const repository = dataSource.getRepository(LaborCodeRegulation);

    await repository.insert(defaultLaborRegulationsData);
  }
}

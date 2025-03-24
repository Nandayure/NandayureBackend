import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { FinancialInstitution } from '../entities/financial-institution.entity';
import { defaultInstitutionData } from '../seed-data/default-data';

export default class FinancialInstitutionSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    // await dataSource.query('SET FOREIGN_KEY_CHECKS = 0;');
    // await dataSource.query('TRUNCATE `financial_institution`;');
    // await dataSource.query('SET FOREIGN_KEY_CHECKS = 1;');
    const repository = dataSource.getRepository(FinancialInstitution);

    await repository.insert(defaultInstitutionData);
  }
}

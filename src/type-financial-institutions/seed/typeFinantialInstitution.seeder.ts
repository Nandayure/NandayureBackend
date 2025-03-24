import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { TypeFinancialInstitution } from '../entities/type-financial-institution.entity';
import { defaultTypeInstitutionData } from '../seed-data/default-data';

export default class type_financial_institutionSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    // await dataSource.query('SET FOREIGN_KEY_CHECKS = 0;');
    // await dataSource.query('TRUNCATE `type_financial_institution`;');
    // await dataSource.query('SET FOREIGN_KEY_CHECKS = 1;');
    const repository = dataSource.getRepository(TypeFinancialInstitution);

    await repository.insert(defaultTypeInstitutionData);
  }
}

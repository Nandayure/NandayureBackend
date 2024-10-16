import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { BudgetCode } from '../entities/budget-code.entity';
import { defaultbudgetCodesData } from '../seed-data/default-data';

export default class BudgetCodeSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    await dataSource.query('SET FOREIGN_KEY_CHECKS = 0;');
    await dataSource.query('TRUNCATE `budget_code`;');
    await dataSource.query('SET FOREIGN_KEY_CHECKS = 1;');
    const repository = dataSource.getRepository(BudgetCode);
    await repository.insert(defaultbudgetCodesData);
  }
}

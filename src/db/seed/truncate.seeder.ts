import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export default class TruncateSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    await dataSource.query('SET FOREIGN_KEY_CHECKS = 0;');
    await dataSource.query('TRUNCATE `employee`;');
    await dataSource.query(
      'TRUNCATE `employee_financial_institutions_financial_institution`;',
    );
    await dataSource.query('TRUNCATE `employee_studies`;');
    await dataSource.query('TRUNCATE `user`;');
    await dataSource.query('TRUNCATE `user_roles`;');
    await dataSource.query('TRUNCATE `request_type`;');
    await dataSource.query('SET FOREIGN_KEY_CHECKS = 1;');
  }
}

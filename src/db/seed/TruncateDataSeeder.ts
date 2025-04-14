import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export default class TruncateDataSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    await dataSource.query('SET FOREIGN_KEY_CHECKS = 0;');
    await dataSource.query('TRUNCATE `municipality`;');
    await dataSource.query('TRUNCATE `role`;');
    await dataSource.query('TRUNCATE `gender`;');
    await dataSource.query('TRUNCATE `marital_status`;');
    await dataSource.query('TRUNCATE `department`;');
    await dataSource.query('TRUNCATE `job_position`;');
    await dataSource.query('TRUNCATE `studies_category`;');
    await dataSource.query('TRUNCATE `study`;');
    await dataSource.query('TRUNCATE `employee`;');
    await dataSource.query('TRUNCATE `employee_studies`;');
    await dataSource.query('TRUNCATE `user`;');
    await dataSource.query('TRUNCATE `drive_folder`;');
    await dataSource.query('TRUNCATE `user_roles`;');
    await dataSource.query('TRUNCATE `request_approval`;');
    await dataSource.query('TRUNCATE `request`;');
    await dataSource.query('TRUNCATE `requests_state`;');
    await dataSource.query('TRUNCATE `request_type`;');
    await dataSource.query('SET FOREIGN_KEY_CHECKS = 1;');
  }
}

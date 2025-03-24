import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { RequestsState } from '../entities/requests-state.entity';
import { defaultRequestStateData } from '../seed-data/default-data';

export default class RequestsStateSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    // await dataSource.query('SET FOREIGN_KEY_CHECKS = 0;');
    // await dataSource.query('TRUNCATE `requests_state`;');
    // await dataSource.query('SET FOREIGN_KEY_CHECKS = 1;');
    const repository = dataSource.getRepository(RequestsState);

    await repository.insert(defaultRequestStateData);
  }
}

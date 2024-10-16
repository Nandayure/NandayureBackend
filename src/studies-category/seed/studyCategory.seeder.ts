import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { StudiesCategory } from '../entities/studies-category.entity';
import { defaultStudyCategoryData } from '../seed-data/default-data';

export default class StudyCategorySeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    //factoryManager: SeederFactoryManager,
  ): Promise<void> {
    await dataSource.query('SET FOREIGN_KEY_CHECKS = 0;');
    await dataSource.query('TRUNCATE `studies_category`;');
    await dataSource.query('SET FOREIGN_KEY_CHECKS = 1;');
    const repository = dataSource.getRepository(StudiesCategory);

    await repository.insert(defaultStudyCategoryData);
  }
}

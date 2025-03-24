import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { RequestType } from '../entities/request-type.entity';
import { defaultRequestTypeData } from '../seed-data/default-data';

export default class RequestTypeSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    // console.log(
    //   '📌 Seeders detectados: ERASDKJFASDKLFJLASD FJASDKF KLASDF JASDKF ASJKLF JKLASDJKASDJKFKASDJASJKFJLKASJKLASDJKLASDJKLFJKLASDFJKLASDJKLFASJDKFJKLASDFJKLASDJKASDJKLFJKLASDFJKLASDJKLFASJKLDFJKLASDF',
    // );
    await dataSource.query('SET FOREIGN_KEY_CHECKS = 0;');
    await dataSource.query('TRUNCATE `request_type`;');
    await dataSource.query('SET FOREIGN_KEY_CHECKS = 1;');
    const repository = dataSource.getRepository(RequestType);
    await repository.insert(defaultRequestTypeData);
  }
}

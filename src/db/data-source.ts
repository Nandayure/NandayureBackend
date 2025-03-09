import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { ConfigModule, ConfigService } from '@nestjs/config';

ConfigModule.forRoot();

const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: 'mysql',

  // url: configService.get<string>('MYSQL_PUBLIC_URL'), // Usar la URL completa
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),

  synchronize: false, //solo en etapa de desarrollo (hace que dure mas arrancando)
  entities: ['dist/**/entities/*.entity.js'],
  logging: false,
  seeds: ['dist/src/db/seed/*.seeder.js'],
  factories: ['dist/src/**/factory/*.factory.js'],
};

export default new DataSource(dataSourceOptions);

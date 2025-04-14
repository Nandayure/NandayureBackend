import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Employee } from '../entities/employee.entity';
import {
  defaultRRHHEmployesData,
  defaultMayorEmployeeData,
  defaultViceMayorEmployeeData,
  defaultTIEmployeeData,
} from '../seed-data/default-data';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { GoogleDriveFilesService } from 'src/google-drive-files/google-drive-files.service';
export default class EmployeeSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const app = await NestFactory.createApplicationContext(AppModule);
    const googleDriveService = app.get(GoogleDriveFilesService);

    const repository = dataSource.getRepository(Employee);
    await repository.save(defaultRRHHEmployesData);
    await repository.save(defaultMayorEmployeeData);
    await repository.save(defaultViceMayorEmployeeData);
    await repository.save(defaultTIEmployeeData);

    await googleDriveService.createMainFolder(
      defaultRRHHEmployesData.id,
      `${defaultRRHHEmployesData.Name} ${defaultRRHHEmployesData.Surname1}`,
    );

    await googleDriveService.createMainFolder(
      defaultMayorEmployeeData.id,
      `${defaultMayorEmployeeData.Name} ${defaultMayorEmployeeData.Surname1}`,
    );

    await googleDriveService.createMainFolder(
      defaultViceMayorEmployeeData.id,
      `${defaultViceMayorEmployeeData.Name} ${defaultViceMayorEmployeeData.Surname1}`,
    );

    await googleDriveService.createMainFolder(
      defaultTIEmployeeData.id,
      `${defaultTIEmployeeData.Name} ${defaultTIEmployeeData.Surname1}`,
    );
  }
}

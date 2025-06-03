import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Employee } from '../entities/employee.entity';
import {
  defaultRRHHEmployesData,
  // defaultMayorEmployeeData,
  // defaultViceMayorEmployeeData,
  // defaultTIEmployeeData,
} from '../seed-data/default-data';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { GoogleDriveFilesService } from 'src/google-drive-files/google-drive-files.service';
import { DriveFolder } from 'src/drive-folder/entities/drive-folder.entity';
export default class EmployeeSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const app = await NestFactory.createApplicationContext(AppModule);
    const googleDriveService = app.get(GoogleDriveFilesService);

    const repository = dataSource.getRepository(Employee);
    const googleDriveFolderRepository = dataSource.getRepository(DriveFolder);
    await repository.save(defaultRRHHEmployesData);
    // await repository.save(defaultMayorEmployeeData);
    // await repository.save(defaultViceMayorEmployeeData);
    // await repository.save(defaultTIEmployeeData);

    const folderIdRRHH = await googleDriveService.createMainFolder(
      defaultRRHHEmployesData.id,
      `${defaultRRHHEmployesData.Name} ${defaultRRHHEmployesData.Surname1}`,
    );

    // const folderIdMayor = await googleDriveService.createMainFolder(
    //   defaultMayorEmployeeData.id,
    //   `${defaultMayorEmployeeData.Name} ${defaultMayorEmployeeData.Surname1}`,
    // );

    // const folderIdViceMayor = await googleDriveService.createMainFolder(
    //   defaultViceMayorEmployeeData.id,
    //   `${defaultViceMayorEmployeeData.Name} ${defaultViceMayorEmployeeData.Surname1}`,
    // );

    // const folderIdTI = await googleDriveService.createMainFolder(
    //   defaultTIEmployeeData.id,
    //   `${defaultTIEmployeeData.Name} ${defaultTIEmployeeData.Surname1}`,
    // );

    googleDriveFolderRepository.save({
      id: defaultRRHHEmployesData.id,
      FolderId: folderIdRRHH,
    });

    // googleDriveFolderRepository.save({
    //   id: defaultMayorEmployeeData.id,
    //   FolderId: folderIdMayor,
    // });

    // googleDriveFolderRepository.save({
    //   id: defaultViceMayorEmployeeData.id,
    //   FolderId: folderIdViceMayor,
    // });

    // googleDriveFolderRepository.save({
    //   id: defaultTIEmployeeData.id,
    //   FolderId: folderIdTI,
    // });
    app.close();
  }
}

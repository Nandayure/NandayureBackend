import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Employee } from '../entities/employee.entity';
import { defaultEmployeesData } from '../seed-data/default-data';
// import { FinancialInstitution } from 'src/financial-institutions/entities/financial-institution.entity';
// import { Study } from 'src/studies/entities/study.entity';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { GoogleDriveFilesService } from 'src/google-drive-files/google-drive-files.service';
export default class EmployeeSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const app = await NestFactory.createApplicationContext(AppModule);
    const googleDriveService = app.get(GoogleDriveFilesService);

    // await dataSource.query('SET FOREIGN_KEY_CHECKS = 0;');
    // await dataSource.query('TRUNCATE `employee`;');
    // await dataSource.query(
    //   'TRUNCATE `employee_financial_institutions_financial_institution`;',
    // );
    // await dataSource.query('TRUNCATE `employee_studies`;');
    // await dataSource.query('SET FOREIGN_KEY_CHECKS = 1;');
    // const repositoryInstitutions =
    //   dataSource.getRepository(FinancialInstitution);

    // const repositoryStudies = dataSource.getRepository(Study);

    // const institutions = await repositoryInstitutions.find();
    // const studies = await repositoryStudies.find();

    // defaultEmployeesData.forEach((employee, index) => {
    //   employee.FinancialInstitutions = institutions;
    //   employee.Studies = [studies[index]]; //solo para pruebas, puede generar error si no hay suficientes estudios
    // });

    const repository = dataSource.getRepository(Employee);
    await repository.save(defaultEmployeesData);

    await googleDriveService.createMainFolder(
      defaultEmployeesData.id,
      `${defaultEmployeesData.Name} ${defaultEmployeesData.Surname1}`,
    );
  }
}

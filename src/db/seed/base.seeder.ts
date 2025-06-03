import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import MunicipalitySeeder from 'src/municipality/seed/municipality.seeder';
import RoleSeeder from 'src/roles/seed/roles.seeder';
import GenderSeeder from 'src/genders/seed/gender.seeder';
import MaritalStatusSeeder from 'src/marital-status/seed/maritalStatus.seeder';
import DepartmentProgramSeeder from 'src/department-programs/seed/programs.seeder';
import DepartmentSeeder from 'src/departments/seed/departments.seeder';
import JobPositionSeeder from 'src/job-positions/seed/jobPosition.seeder';
import EmployeeSeeder from 'src/employees/seeds/employee.seeder';
import UserSeeder from 'src/users/seed/users.seeder';
import StudyCategorySeeder from 'src/studies-category/seed/studyCategory.seeder';
import StudySeeder from 'src/studies/seed/study.seeder';
import RequestsStateSeeder from 'src/requests-state/seed/requestState.seeder';
import RequestTypeSeeder from 'src/request-types/seed/RequestType.seeder';
import TruncateDataSeeder from './TruncateDataSeeder';
// import TruncateSeeder from './truncate.seeder';

export default class BaseSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const truncateSeeder = new TruncateDataSeeder();
    const municipalitySedder = new MunicipalitySeeder();
    const roleSedder = new RoleSeeder();
    const genderSeeder = new GenderSeeder();
    const maritalStatusSeeder = new MaritalStatusSeeder();
    const departmentProgramSeeder = new DepartmentProgramSeeder();
    const department = new DepartmentSeeder();
    const jobPositionSeeder = new JobPositionSeeder();
    const employeeSeeder = new EmployeeSeeder();
    const userSeeder = new UserSeeder();
    const studyCategorySeeder = new StudyCategorySeeder();
    const studySeeder = new StudySeeder();
    const requestsStateSeeder = new RequestsStateSeeder();
    const requestTypeSeeder = new RequestTypeSeeder();

    await truncateSeeder.run(dataSource);
    await municipalitySedder.run(dataSource);
    await roleSedder.run(dataSource);
    await genderSeeder.run(dataSource);
    await maritalStatusSeeder.run(dataSource);
    await departmentProgramSeeder.run(dataSource);
    await department.run(dataSource);
    await jobPositionSeeder.run(dataSource);
    await studyCategorySeeder.run(dataSource);
    await studySeeder.run(dataSource);
    await employeeSeeder.run(dataSource);
    await userSeeder.run(dataSource);
    await requestsStateSeeder.run(dataSource);
    await requestTypeSeeder.run(dataSource);

    // Actualizar departmentHeadId después de insertar empleados
    const departmentRepository = dataSource.getRepository('Department');
    await departmentRepository.update(
      { name: 'RECURSOS HUMANOS' },
      { departmentHeadId: '503730488' },
    );
    // await departmentRepository.update(
    //   { name: 'ADMINISTRACIÓN' },
    //   { departmentHeadId: '504420108' },
    // );
    // await departmentRepository.update(
    //   { name: 'TI' },
    //   { departmentHeadId: '504488777' },
    // );
  }
}

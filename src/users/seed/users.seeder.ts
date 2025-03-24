import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../entities/user.entity';
import { Role } from 'src/roles/entities/role.entity';
import { defaultEmployeesData } from 'src/employees/seed-data/default-data';
import { DefaultUserDto } from '../dto/defaultUser.dto';
import * as bcrypt from 'bcrypt';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    //factoryManager: SeederFactoryManager,
  ): Promise<void> {
    await dataSource.query('SET FOREIGN_KEY_CHECKS = 0;');
    await dataSource.query('TRUNCATE `user`;');
    await dataSource.query('TRUNCATE `user_roles`;');
    await dataSource.query('SET FOREIGN_KEY_CHECKS = 1;');

    const Userrepository = dataSource.getRepository(User);
    const Rolerepository = dataSource.getRepository(Role);

    const defaultPassword = await bcrypt.hash('#Desarrollo', 10);

    const userRole = await Rolerepository.findOneBy({ RoleName: 'USER' });
    const departmentHeadRole = await Rolerepository.findOneBy({
      RoleName: 'DEPARTMENT_HEAD',
    });
    const adminRole = await Rolerepository.findOneBy({ RoleName: 'RH' });

    // const data: DefaultUserDto[] = defaultEmployeesData.map((employee) => ({
    //   id: employee.id,
    //   Password: defaultPassword,
    //   Roles: [userRole],
    // }));

    const data: DefaultUserDto = {
      id: defaultEmployeesData.id,
      Password: defaultPassword,
      Roles: [userRole, departmentHeadRole, adminRole],
    };
    // for (let i = 0; i <= 4; i++) {
    //   data[i].Roles = [...data[i].Roles, adminRole];
    // }

    await Userrepository.save(data);
  }
}

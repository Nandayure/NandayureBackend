import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../entities/user.entity';
import { Role } from 'src/roles/entities/role.entity';
import {
  defaultRRHHEmployesData,
  // defaultMayorEmployeeData,
  // defaultViceMayorEmployeeData,
  // defaultTIEmployeeData,
} from 'src/employees/seed-data/default-data';
import { DefaultUserDto } from '../dto/defaultUser.dto';
import * as bcrypt from 'bcrypt';

export default class UserSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const UserRepository = dataSource.getRepository(User);
    const RoleRepository = dataSource.getRepository(Role);

    const defaultPassword = await bcrypt.hash('#Desarrollo', 10);

    const USER_Role = await RoleRepository.findOneBy({ id: 1 });
    // const TI_Role = await RoleRepository.findOneBy({ id: 2 });
    const RRHH_Role = await RoleRepository.findOneBy({ id: 3 });
    //const MAYOR_SUBMAYOR_Role = await RoleRepository.findOneBy({ id: 4 });
    const DepartmentHead_Role = await RoleRepository.findOneBy({
      id: 5,
    });

    const RRHHdata: DefaultUserDto = {
      id: defaultRRHHEmployesData.id,
      Password: defaultPassword,
      Roles: [USER_Role, DepartmentHead_Role, RRHH_Role],
    };

    // const MayorData: DefaultUserDto = {
    //   id: defaultMayorEmployeeData.id,
    //   Password: defaultPassword,
    //   Roles: [USER_Role, MAYOR_SUBMAYOR_Role, DepartmentHead_Role],
    // };
    // const ViceMayorData: DefaultUserDto = {
    //   id: defaultViceMayorEmployeeData.id,
    //   Password: defaultPassword,
    //   Roles: [USER_Role, MAYOR_SUBMAYOR_Role],
    // };
    // const TIdata: DefaultUserDto = {
    //   id: defaultTIEmployeeData.id,
    //   Password: defaultPassword,
    //   Roles: [USER_Role, TI_Role, DepartmentHead_Role],
    // };

    await UserRepository.save(RRHHdata);
    // await UserRepository.save(MayorData);
    // await UserRepository.save(ViceMayorData);
    // await UserRepository.save(TIdata);
  }
}

import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import * as generatePassword from 'generate-password';
import { MailClientService } from 'src/mail-client/mail-client.service';
import { RolesService } from 'src/roles/roles.service';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { GetUsersQueryDto } from './dto/GetUsersQueryDto';
import { instanceToPlain } from 'class-transformer';

type UserRoleRow = {
  userId: number;
  roleId: number;
};
@Injectable()
export class UsersService {
  private userRolesRepo: Repository<UserRoleRow>;
  constructor(
    private readonly userRepository: UserRepository,
    private readonly mailClient: MailClientService,
    private readonly rolesService: RolesService,
    private readonly dataSource: DataSource,
  ) {
    this.userRolesRepo = this.dataSource.getRepository('user_roles');
  }

  async create(
    createUserDto: CreateUserDto,
    queryRunner: QueryRunner,
    jobPositionId: number,
  ) {
    try {
      let rolesToNewUser;
      //get Basic role (USER)
      const initialRole = await this.rolesService.findOneById(1);
      if (!initialRole) {
        throw new InternalServerErrorException('El rol inicial no se encontró');
      }

      if (jobPositionId === 1 || jobPositionId === 2) {
        //if the user is alcalde o alcaldesa, add the role of alcalde
        const roleVA = await this.rolesService.findOneById(4);

        rolesToNewUser = [initialRole, roleVA];
      } else {
        rolesToNewUser = [initialRole];
      }

      const password = await this.generatePassword(8, true, true);
      const hashedPassword = await this.hashPassword(password, 10);

      const user = this.userRepository.create({
        id: createUserDto.id,
        Password: hashedPassword,
        Roles: rolesToNewUser,
      });

      this.mailClient.sendWelcomeMail({
        to: createUserDto.Email,
        subject: 'Bienvenido',
        EmployeeId: createUserDto.id,
        Password: password,
      });

      return await queryRunner.manager.save(user);
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Error al crear el usuario: ' + error.message,
      });
    }
  }

  async findAllUserWithFilters(getUsersQueryDto: GetUsersQueryDto) {
    const page = Number(getUsersQueryDto.page ?? 1);
    const limit = Number(getUsersQueryDto.limit ?? 10);

    const [users, totalItems] =
      await this.userRepository.findAllWithFilters(getUsersQueryDto);

    const totalPages = Math.ceil(totalItems / limit);

    return {
      data: instanceToPlain(users),
      page,
      limit,
      totalItems,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    };
  }

  async findOneById(id: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
        relations: ['Employee', 'Roles'],
      });
      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Error al encontrar el usuario: ' + error.message,
      });
    }
  }

  async findOneByEmail(email: string) {
    try {
      const user = await this.userRepository.findOne({
        relations: ['Employee'],
        where: {
          Employee: {
            Email: email,
          },
        },
      });
      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Error al encontrar el usuario: ' + error.message,
      });
    }
  }

  async findRoleByName(name: string) {
    return await this.rolesService.findOneByName(name);
  }

  async generatePassword(
    digits: number,
    haveNumbers: boolean,
    haveUppercase: boolean,
  ) {
    return generatePassword.generate({
      length: digits,
      numbers: haveNumbers,
      uppercase: haveUppercase,
    });
  }

  async hashPassword(password: string, salt: number) {
    return await bcrypt.hash(password, salt);
  }

  async updatePassword(employeeId: string, newPassword: string) {
    try {
      const user = await this.findOneById(employeeId);
      user.Password = await this.hashPassword(newPassword, 10);
      return await this.userRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException({
        message:
          'Error al actualizar la contraseña del usuario: ' + error.message,
      });
    }
  }

  async restore(id: string) {
    const user = await this.userRepository.restore(id);
    if (!user) {
      throw new NotFoundException('Error al restaurar el usuario');
    }
  }

  async findUserWithRoles(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: { Roles: true },
    });

    return user;
  }

  async UpdateUserStatus(id: string, status: boolean) {
    const user = await this.userRepository.findOneById(id);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    user.enabled = status;
    return await this.userRepository.save(user);
  }

  async AddRoleToUser(userId: string, RoleId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: { Roles: true },
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    const roles = user.Roles;

    const roleExists = roles.some((role) => role.id === RoleId);

    if (roleExists) {
      return { message: 'El usuario ya posee este rol' };
    }

    const roleToAdd = await this.rolesService.findOneById(RoleId);

    if (!roleToAdd) {
      throw new NotFoundException('Rol no encontrado!');
    }

    roles.push(roleToAdd);

    return await this.userRepository.save({
      ...user,
      Roles: roles,
    });
  }
  async RemoveRoleToUser(userId: string, RoleId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: { Roles: true },
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    const roles = user.Roles;

    const roleExists = roles.some((role) => role.id === RoleId);

    if (!roleExists) {
      return { message: 'El usuario no posee el rol a eliminar' };
    }

    const roleToDelete = await this.rolesService.findOneById(RoleId);

    if (!roleToDelete) {
      throw new NotFoundException('Rol no encontrado!');
    }

    // Filtrar roles eliminando el que coincide con RoleId
    const updatedRoles = roles.filter((role) => role.id !== RoleId);

    return await this.userRepository.save({
      ...user,
      Roles: updatedRoles,
    });
  }
}

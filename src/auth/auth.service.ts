import {
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login-dto';
//import { RegisterDto } from './dto/register-dto';
import { JwtService } from '@nestjs/jwt';
//import { UpdateDto } from './dto/update-dto';
import { MailClientService } from 'src/mail-client/mail-client.service';
import { ConfigService } from '@nestjs/config';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { v4 as uuidv4 } from 'uuid';
import { ChangeUserStatusDto } from './dto/change-user-status-dto';
import { GetUsersQueryDto } from 'src/users/dto/GetUsersQueryDto';
import { RolesService } from 'src/roles/roles.service';
import { Role } from './auth-roles/role.enum';
//import { SendmailerService } from 'src/sendmailer/sendmailer.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
    private readonly mailClient: MailClientService,
    private readonly configService: ConfigService,
    private readonly rolesService: RolesService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async login({ EmployeeId, Password }: LoginDto) {
    try {
      const userToLogin = await this.userService.findOneById(EmployeeId);
      if (!userToLogin) {
        throw new UnauthorizedException(
          'No existe ese número de identificacion en el sistema',
        );
      }

      const IsCorrectPassword = await this.comparePasswords(
        Password,
        userToLogin.Password,
      );

      if (!IsCorrectPassword) {
        throw new UnauthorizedException('Contraseña incorrecta');
      }

      if (!userToLogin.enabled) {
        throw new UnauthorizedException(
          'Usuario inactivo, contacte al administrador de Recurso Humano',
        );
      }

      const rolesNames = userToLogin.Roles?.map((role) => role.RoleName);
      const payload = {
        id: userToLogin.id,
        roles: rolesNames,
        jti: uuidv4(),
      };

      // Mejora para la detección de cumpleaños
      let isBirthday = false;

      if (userToLogin.Employee.Birthdate) {
        const birthDate = new Date(userToLogin.Employee.Birthdate);
        const today = new Date();
        isBirthday =
          birthDate.getMonth() === today.getMonth() &&
          birthDate.getDate() === today.getDate();

        if (birthDate.getMonth() === 1 && birthDate.getDate() === 29) {
          const isLeapYear =
            new Date(today.getFullYear(), 1, 29).getMonth() === 1;
          if (!isLeapYear && today.getMonth() === 1 && today.getDate() === 28) {
            isBirthday = true;
          }
        }
      }

      return {
        name: userToLogin.Employee.Name,
        employeeId: userToLogin.id,
        surname1: userToLogin.Employee.Surname1,
        surname2: userToLogin.Employee.Surname2,
        email: userToLogin.Employee.Email,
        isBirthday,
        access_token: await this.jwtService.signAsync(payload, {
          expiresIn: '1d',
        }),
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      if (error instanceof InternalServerErrorException) {
        throw error;
      }
      throw new InternalServerErrorException('Error en el inicio de sesión: ');
    }
  }

  async comparePasswords(passwordToCompare: string, mainPassword: string) {
    const IsCorrectPassword = await bcrypt.compare(
      passwordToCompare,
      mainPassword,
    );

    return IsCorrectPassword;
  }

  async changePassword(
    EmployeeId: string,
    oldPassword: string,
    newPassword: string,
  ) {
    const userToEdit = await this.userService.findOneById(EmployeeId);

    if (!userToEdit) {
      throw new NotFoundException('Usurio no encontrado!');
    }

    const IsCorrectPassword = await this.comparePasswords(
      oldPassword,
      userToEdit.Password,
    );
    if (!IsCorrectPassword) {
      throw new UnauthorizedException('Contraseña actual invalida');
    }

    return this.userService.updatePassword(EmployeeId, newPassword);
  }

  async forgotPassword(Email: string) {
    const userToEdit = await this.userService.findOneByEmail(Email);
    if (userToEdit) {
      const payload = await {
        Email: userToEdit.Employee.Email,
        id: userToEdit.id,
        jti: uuidv4(),
      };

      if (!userToEdit) {
        throw new NotFoundException('Correo electronico no encontrado!');
      }

      if (!userToEdit.enabled) {
        throw new UnauthorizedException(
          'Usuario inactivo, contacte al administrador de Recurso Humano',
        );
      }

      const token = await this.jwtService.signAsync(payload, {
        expiresIn: '10m',
      });
      const FrontendRecoverURL = `${await this.configService.get('FrontEndBaseURL')}auth/reset-password`;
      const url = `${FrontendRecoverURL}?token=${token}`;

      this.mailClient.sendRecoverPasswordMail({
        to: Email,
        subject: 'Recuperación de constraseña',
        RecoverPasswordURL: url,
      });
    }

    return {
      message:
        'Si el usuario es valido recibirá un email en breve para la recuperación',
    };
  }

  async resetPassword(EmployeeId: string, newPassword: string) {
    const userToEdit = await this.userService.findOneById(EmployeeId);

    if (!userToEdit) {
      throw new NotFoundException('Usurio no encontrado!');
    }

    return this.userService.updatePassword(EmployeeId, newPassword);
  }

  async emailExists(email: string) {
    try {
      const user = await this.userService.findOneByEmail(email);
      return !!user;
    } catch (error) {
      return false;
    }
  }

  async idExists(id: string) {
    try {
      const user = await this.userService.findOneById(id);
      return !!user;
    } catch (error) {
      return false;
    }
  }

  async changeUserStatus(changeUserStatusDto: ChangeUserStatusDto) {
    const { id, status } = changeUserStatusDto;
    const userToEdit = await this.userService.findOneById(id);

    if (!userToEdit) {
      throw new NotFoundException('Usurio no encontrado!');
    }

    return this.userService.UpdateUserStatus(id, status);
  }

  async getAllUsersWithFilters(getUsersQueryDto: GetUsersQueryDto) {
    return await this.userService.findAllUserWithFilters(getUsersQueryDto);
  }

  async addRoleToUser(userId: string, RoleId: number) {
    return await this.userService.AddRoleToUser(userId, RoleId);
  }
  async removeRoleToUser(userId: string, RoleId: number) {
    return await this.userService.RemoveRoleToUser(userId, RoleId);
  }

  async authMe(userId: string, tokenRoles: Role[]) {
    const user = await this.userService.findUserWithRoles(userId);
    if (!user.enabled) throw new HttpException('Sesión desactualizada.', 629);
    const dbRoles: Role[] = user.Roles.map((role) => role.RoleName as Role);

    const rolesChanged =
      tokenRoles.length !== dbRoles.length ||
      !tokenRoles.every((r) => dbRoles.includes(r)) ||
      !dbRoles.every((r) => tokenRoles.includes(r));

    if (rolesChanged) {
      throw new HttpException('Sesión desactualizada.', 629);
    }

    return {
      message: 'Sesión valida',
    };
  }
}

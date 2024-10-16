import {
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
//import { SendmailerService } from 'src/sendmailer/sendmailer.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
    private readonly mailClient: MailClientService,
    private readonly configService: ConfigService,
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

      const rolesNames = userToLogin.Roles?.map((role) => role.RoleName);
      const payload = {
        id: userToLogin.id,
        roles: rolesNames,
        jti: uuidv4(),
      };

      return {
        name: userToLogin.Employee.Name,
        employeeId: userToLogin.id,
        surname1: userToLogin.Employee.Surname1,
        surname2: userToLogin.Employee.Surname2,
        email: userToLogin.Employee.Email,
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error; // Relanza la excepción específica
      }
      if (error instanceof InternalServerErrorException) {
        throw error;
      }
      // Manejo de cualquier otra excepción no prevista
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

      const token = await this.jwtService.signAsync(payload, {
        expiresIn: '10m',
      });
      const FrontendRecoverURL =
        await this.configService.get('ResetPasswordURL');
      const url = `${FrontendRecoverURL}?token=${token}`;

      await this.mailClient.sendRecoverPasswordMail({
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
}

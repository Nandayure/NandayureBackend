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
import { ConfigService } from '@nestjs/config';
import { RolesService } from 'src/roles/roles.service';
import { QueryRunner } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly mailClient: MailClientService,
    private readonly configService: ConfigService,
    private readonly roleRepository: RolesService,
  ) {}

  async create(createUserDto: CreateUserDto, queryRunner: QueryRunner) {
    try {
      const initialRole = await this.findRoleByName('USER');
      if (!initialRole) {
        throw new InternalServerErrorException('El rol inicial no se encontró');
      }

      const password = await this.generatePassword(8, true, true);
      const hashedPassword = await this.hashPassword(password, 10);

      const user = this.userRepository.create({
        id: createUserDto.id,
        Password: hashedPassword,
        Roles: [initialRole],
      });
      await this.mailClient.sendWelcomeMail({
        to: createUserDto.Email,
        subject: 'Bienvenido',
        LoginURL: await this.configService.get('FrontEndLoginURL'),
        EmployeeId: createUserDto.id,
        Password: password,
      });

      return await queryRunner.manager.save(user);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException({
        message: 'Error al crear el usuario: ' + error.message,
      });
    }
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
    return await this.roleRepository.findOneByName(name);
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
}

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { DataSource } from 'typeorm';
import { RoleRepository } from './repository/role.repository';

@Injectable()
export class RolesService {
  constructor(
    private readonly roleRepository: RoleRepository,
    private dataSource: DataSource,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    try {
      const existRole = await this.findOneByName(createRoleDto.RoleName);
      if (existRole) {
        return { message: 'El rol ya existe: ', role: existRole.RoleName };
      }
      const newRole = this.roleRepository.create(createRoleDto);
      return this.roleRepository.save(newRole);
    } catch (error) {
      console.error('Error:', error);
      // Manejo de cualquier otra excepción no prevista
      throw new InternalServerErrorException({
        message: 'Error en el inicio de sesión: ' + error.message,
      });
    }
  }

  async findAll() {
    return `This action returns all roles`;
  }

  async findOneByName(RoleName: string) {
    return this.roleRepository.findByCondition({
      where: { RoleName: RoleName },
    });
  }

  // update(id: number, updateRoleDto: UpdateRoleDto) {
  //   return `This action updates a #${id} role`;
  // }

  async remove(id: number) {
    return `This action removes a #${id} role`;
  }

  // async createDefaultRoles(rolesNames: string[]) {
  //   const queryRunner = this.dataSource.createQueryRunner();
  //   await queryRunner.connect();
  //   await queryRunner.startTransaction();

  //   for()

  //   try {
  //     await queryRunner.manager.save(rolesNames[0]);
  //     await queryRunner.manager.save(rolesNames[1]);

  //     await queryRunner.commitTransaction();
  //   } catch (err) {
  //     // since we have errors lets rollback the changes we made
  //     await queryRunner.rollbackTransaction();
  //   } finally {
  //     // you need to release a queryRunner which was manually instantiated
  //     await queryRunner.release();
  //   }
  // }
}

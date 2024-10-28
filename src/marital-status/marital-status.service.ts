import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateMaritalStatusDto } from './dto/create-marital-status.dto';
import { UpdateMaritalStatusDto } from './dto/update-marital-status.dto';
import { MaritalStatusRepository } from './repository/marital-status.repository';

@Injectable()
export class MaritalStatusService {
  constructor(
    private readonly maritarStatusRepository: MaritalStatusRepository,
  ) {}

  async create(createMaritalStatusDto: CreateMaritalStatusDto) {
    try {
      const existStatus = await this.maritarStatusRepository.findByCondition({
        where: { Name: createMaritalStatusDto.Name },
      });

      if (existStatus) {
        return {
          message: 'El estado civil ya existe',
          Estado: existStatus.Name,
        };
      }

      const newMaritalStatus = await this.maritarStatusRepository.create(
        createMaritalStatusDto,
      );
      return this.maritarStatusRepository.save(newMaritalStatus);
    } catch (error) {
      console.error('Error:', error);
      // Manejo de cualquier otra excepción no prevista
      throw new InternalServerErrorException({
        message: 'Error al crear un estado civil: ' + error.message,
      });
    }
  }

  findAll() {
    return this.maritarStatusRepository.findAll();
  }

  async findOneById(id: number) {
    return this.maritarStatusRepository.findOneById(id);
  }

  // findOneByName(Name: string) {
  //   return this.maritarStatusRepository.findOneBy();
  // }

  update(id: number, updateMaritalStatusDto: UpdateMaritalStatusDto) {
    const maritalStatusToEdit = this.maritarStatusRepository.findOneById(id);
    if (!maritalStatusToEdit) {
      throw new BadRequestException({
        error: 'No existe el usuario con número de cédula: ' + id,
      });
    }
    return this.maritarStatusRepository.save({
      ...maritalStatusToEdit,
      ...updateMaritalStatusDto,
    });
  }

  async remove(id: number) {
    try {
      const maritalStatusToRemove = await this.maritarStatusRepository.findOne({
        where: { id },
        relations: {
          employees: true,
        },
      });

      if (!maritalStatusToRemove) {
        throw new NotFoundException('No se encontró el registro a eliminar');
      }

      if (maritalStatusToRemove.employees.length > 0) {
        throw new NotFoundException(
          'No se puede eliminar el estado civil porque está relacionado con empleados',
        );
      }
      return await this.maritarStatusRepository.remove(maritalStatusToRemove);
    } catch (error) {
      throw error;
    }
  }
}

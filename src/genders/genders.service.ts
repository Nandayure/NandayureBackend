import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';
import { GenderRepository } from './repository/gender.repository';

@Injectable()
export class GendersService {
  constructor(private readonly gendersService: GenderRepository) {}

  async create(createGenderDto: CreateGenderDto) {
    try {
      const existGenre = await this.findOneByName(createGenderDto.Name);
      if (existGenre) {
        return {
          message: 'El genero ya existe',
          Genero: existGenre.Name,
        };
      }

      const newGenre = this.gendersService.create(createGenderDto);
      return this.gendersService.save(newGenre);
    } catch (error) {
      console.error('Error:', error);
      // Manejo de cualquier otra excepción no prevista
      throw new InternalServerErrorException({
        message: 'Error al crear un estado civil: ' + error.message,
      });
    }
  }

  async findAll() {
    return this.gendersService.findAll();
  }

  async findOneById(id: number) {
    return this.gendersService.findOneById(id);
  }

  async findOneByName(Name: string) {
    return this.gendersService.findByCondition({ where: { Name: Name } });
  }

  async update(id: number, updateGenderDto: UpdateGenderDto) {
    const genreToEdit = await this.gendersService.findOneById(id);

    if (!genreToEdit) {
      throw new BadRequestException({
        error: 'No existe el id del genero: ' + id,
      });
    }

    return this.gendersService.save({ ...genreToEdit, ...updateGenderDto });
  }

  async remove(id: number) {
    try {
      const genreToRemove = await this.gendersService.findOneById({
        where: { id },
        relations: {
          Employees: true,
        },
      });

      if (!genreToRemove) {
        throw new NotFoundException('No existe el id del genero: ' + id);
      }
      if (genreToRemove.employees.length > 0) {
        throw new NotFoundException(
          'No se puede eliminar el genero porque está relacionado con empleados',
        );
      }
      return this.gendersService.remove(genreToRemove);
    } catch {
      throw new NotFoundException();
    }
  }
}

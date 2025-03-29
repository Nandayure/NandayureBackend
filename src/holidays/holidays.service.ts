import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateHolidayDto } from './dto/create-holiday.dto';
import { UpdateHolidayDto } from './dto/update-holiday.dto';
import { HolidayRepository } from './repository/holiday.repository';

@Injectable()
export class HolidaysService {
  constructor(private readonly holidayRepository: HolidayRepository) { }

  async create(createHolidayDto: CreateHolidayDto) {
    try {
      // Convertir date string a Date para la búsqueda
      const dateObject = new Date(createHolidayDto.date);

      const holidayExists = await this.holidayRepository.findOne({
        where: {
          name: createHolidayDto.name,
          date: dateObject
        },
      });

      if (holidayExists) {
        return { message: 'El día feriado ya existe: ' + holidayExists.name };
      }

      const newHoliday = this.holidayRepository.create({
        ...createHolidayDto,
        date: dateObject, 
        createdAt: new Date(),
      });

      return this.holidayRepository.save(newHoliday);
    } catch (error) {
      console.error('Error:', error);
      throw new InternalServerErrorException({
        message: 'Error al crear el nuevo día feriado: ' + error.message,
      });
    }
  }

  async findAll() {
    return await this.holidayRepository.findAll();
  }

  async findOne(id: number) {
    return await this.holidayRepository.findOneById(id);
  }

  async update(id: number, updateHolidayDto: UpdateHolidayDto) {
    try {
      const holidayToUpdate = await this.holidayRepository.findOneById(id);
      if (!holidayToUpdate) {
        return { message: 'El día feriado no existe' };
      }

      const updatedData: any = { ...updateHolidayDto };
      
      if (updateHolidayDto.date) {
        updatedData.date = new Date(updateHolidayDto.date);
      }

      const updatedHoliday = await this.holidayRepository.save({
        ...holidayToUpdate,
        ...updatedData,
        updatedAt: new Date(),
      });

      return updatedHoliday;
    } catch (error) {
      console.error('Error:', error);
      throw new InternalServerErrorException({
        message: 'Error al actualizar el día feriado: ' + error.message,
      });
    }
  }

  async remove(id: number) {
    try {
      const holidayToDelete = await this.holidayRepository.findOneById(id);
      if (!holidayToDelete) {
        return { message: 'El día feriado no existe' };
      }
      await this.holidayRepository.remove(holidayToDelete);
      return { message: 'Día feriado eliminado' };
    } catch (error) {
      console.error('Error:', error);
      throw new InternalServerErrorException({
        message: 'Error al eliminar el día feriado: ' + error.message,
      });
    }
  }
}
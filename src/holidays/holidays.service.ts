import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateHolidayDto } from './dto/create-holiday.dto';
import { UpdateHolidayDto } from './dto/update-holiday.dto';
import { HolidayRepository } from './repository/holiday.repository';

@Injectable()
export class HolidaysService {
  constructor(private readonly holidayRepository: HolidayRepository) {}

  async validateNewHoliday(createHolidayDto: CreateHolidayDto) {
    const { specificDate, recurringDay, recurringMonth, isRecurringYearly } =
      createHolidayDto;

    if (isRecurringYearly) {
      const holiday = await this.holidayRepository.findOne({
        where: { recurringDay, recurringMonth, isRecurringYearly: true },
      });
      if (holiday) {
        throw new ConflictException(
          'Ya existe un día feriado recurrente con la misma fecha',
        );
      }
    } else {
      const dateObject = new Date(specificDate);
      const holiday = await this.holidayRepository.findOne({
        where: { specificDate: dateObject, isRecurringYearly: false },
      });
      if (holiday) {
        throw new ConflictException(
          'Ya existe un día feriado específico con la misma fecha',
        );
      }
    }
  }

  async create(createHolidayDto: CreateHolidayDto) {
    await this.validateNewHoliday(createHolidayDto);

    const newHoliday = this.holidayRepository.create({
      ...createHolidayDto,
      createdAt: new Date(),
    });

    return this.holidayRepository.save(newHoliday);
  }

  async findAll() {
    return await this.holidayRepository.findAll();
  }

  async findOne(id: number) {
    return await this.holidayRepository.findOneById(id);
  }

  async isHoliday(date: Date) {
    const holidays = await this.holidayRepository.findAll({
      where: {
        isActive: true,
        isRecurringYearly: true,
        recurringDay: date.getDay(),
        recurringMonth: date.getMonth() + 1,
      },
    });

    if (holidays.length > 0) {
      return true;
    }

    const specificHoliday = await this.holidayRepository.findOne({
      where: { specificDate: date, isRecurringYearly: false },
    });

    return specificHoliday ? true : false;
  }

  async update(id: number, updateHolidayDto: UpdateHolidayDto) {
    try {
      const holidayToUpdate = await this.holidayRepository.findOneById(id);
      if (!holidayToUpdate) {
        return { message: 'El día feriado no existe' };
      }

      const updatedData: any = { ...updateHolidayDto };

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

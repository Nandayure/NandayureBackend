import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAttendanceStatusDto } from './dto/create-attendance-status.dto';
import { UpdateAttendanceStatusDto } from './dto/update-attendance-status.dto';
import { AttendanceStatusRepository } from './repository/attendance-status.repository';

@Injectable()
export class AttendanceStatusService {
  constructor(
    private readonly attendanceStatusRepository: AttendanceStatusRepository,
  ) {}
  async create(createAttendanceStatusDto: CreateAttendanceStatusDto) {
    const newStatus = this.attendanceStatusRepository.create(
      createAttendanceStatusDto,
    );

    return await this.attendanceStatusRepository.save(newStatus);
  }

  async findAll() {
    return await this.attendanceStatusRepository.findAll();
  }

  async findOne(id: number) {
    return await this.attendanceStatusRepository.findOneById(id);
  }

  async findOneByName(Name: string) {
    return await this.attendanceStatusRepository.findOne({ where: { Name } });
  }

  async update(
    id: number,
    updateAttendanceStatusDto: UpdateAttendanceStatusDto,
  ) {
    const statusToEdit = await this.attendanceStatusRepository.findOneById(id);

    if (!statusToEdit) {
      throw new NotFoundException('No es encontró el registro a editar');
    }

    return await this.attendanceStatusRepository.save({
      ...statusToEdit,
      ...updateAttendanceStatusDto,
    });
  }

  async remove(id: number) {
    const statusToRemove =
      await this.attendanceStatusRepository.findOneById(id);

    if (!statusToRemove) {
      throw new NotFoundException('No es encontró el registro a editar');
    }
    return await this.attendanceStatusRepository.remove(statusToRemove);
  }
}

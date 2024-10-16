import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { AttendanceRepository } from './repository/attendance.repository';
import { EmployeesService } from 'src/employees/employees.service';

@Injectable()
export class AttendanceService {
  constructor(
    private readonly attendanceRepository: AttendanceRepository,
    private readonly employeeRepository: EmployeesService,
  ) {}

  async create(createAttendanceDto: CreateAttendanceDto) {
    const existEmployee = await this.employeeRepository.findOneById(
      createAttendanceDto.employeeId,
    );

    if (!existEmployee) {
      throw new NotFoundException('empleado no encontrado');
    }

    const newAttendance = this.attendanceRepository.create({
      ...createAttendanceDto,
      employee: { id: createAttendanceDto.employeeId },
    });
    return await this.attendanceRepository.save(newAttendance);
  }

  async findAll() {
    return await this.attendanceRepository.findAll();
  }

  async findOne(id: number) {
    return await this.attendanceRepository.findOneById(id);
  }

  async update(id: number, updateAttendanceDto: UpdateAttendanceDto) {
    const existAttendance = await this.attendanceRepository.findOneById(id);

    if (!existAttendance) {
      throw new NotFoundException('registro a editar no encontrado');
    }

    return await this.attendanceRepository.save({
      ...existAttendance,
      ...updateAttendanceDto,
    });
  }

  async remove(id: number) {
    const existAttendance = await this.attendanceRepository.findOneById(id);

    if (!existAttendance) {
      throw new NotFoundException('registro a eliminar no encontrado');
    }

    return await this.attendanceRepository.remove(existAttendance);
  }
}

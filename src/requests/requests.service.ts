import { Injectable, NotFoundException } from '@nestjs/common';
import { RequestRepository } from './repository/request.repository';
import { RequestsStateService } from 'src/requests-state/requests-state.service';
import { EmployeesService } from 'src/employees/employees.service';
import { QueryRunner } from 'typeorm';

@Injectable()
export class RequestsService {
  constructor(
    private readonly requestRepository: RequestRepository,
    private readonly requestStateRepository: RequestsStateService,
    private readonly employeeRepository: EmployeesService,
  ) {}

  async createRequest(
    EmployeeId: string,
    Name: string,
    Surname1: string,
    Surname2: string,
    RequestTypeId: number,
    queryRunner: QueryRunner,
  ) {
    const request = this.requestRepository.create({
      EmployeeId: EmployeeId,
      RequestTypeId: RequestTypeId,
      Name: Name,
      Surname1: Surname1,
      Surname2: Surname2,
      RequestStateId: 1,
      date: new Date(),
    });

    return await queryRunner.manager.save(request);
  }

  async findAll() {
    return await this.requestRepository.findAll({
      relations: {
        RequestApprovals: true,
        RequestVacation: true,
        RequestSalaryCertificate: true,
        RequestPaymentConfirmation: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.requestRepository.findOneById(id);
  }

  async findAllRequestByEmployee(EmployeeId: string) {
    return await this.requestRepository.findAll({
      where: { EmployeeId: EmployeeId },
      relations: {
        RequestApprovals: true,
        RequestVacation: true,
        RequestSalaryCertificate: true,
        RequestPaymentConfirmation: true,
      },
    });
  }

  async remove(id: number) {
    const requestToRemove = await this.requestRepository.findOneById(id);

    if (!requestToRemove) {
      throw new NotFoundException('solicitud no encontrada');
    }

    return await this.requestRepository.remove(requestToRemove);
  }
}

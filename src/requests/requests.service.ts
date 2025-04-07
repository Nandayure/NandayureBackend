import { Injectable, NotFoundException } from '@nestjs/common';
import { RequestRepository } from './repository/request.repository';
import { RequestsStateService } from 'src/requests-state/requests-state.service';
import { EmployeesService } from 'src/employees/employees.service';
import { buildRequestQuery } from './utils/build-request.query.util';
import { QueryRunner } from 'typeorm';
import { GetRequestsQueryDto } from './dto/get-requests-query.dto';

@Injectable()
export class RequestsService {
  constructor(
    private readonly requestRepository: RequestRepository,
    private readonly requestStateRepository: RequestsStateService,
    private readonly employeeRepository: EmployeesService,
  ) {}

  async createRequest(
    EmployeeId: string,
    RequestTypeId: number,
    queryRunner: QueryRunner,
  ) {
    const request = this.requestRepository.create({
      EmployeeId: EmployeeId,
      RequestTypeId: RequestTypeId,
      RequestStateId: 1,
      date: new Date(),
    });

    return await queryRunner.manager.save(request);
  }

  async findAll(query: GetRequestsQueryDto) {
    const { options, page, limit } = buildRequestQuery(query);

    const [data, totalItems] =
      await this.requestRepository.findAllWithCount(options);

    const totalPages = Math.ceil(totalItems / limit);

    return {
      data,
      page,
      limit,
      totalItems,
      totalPages,
    };
  }
  // return await this.requestRepository.findAll({
  //   relations: {
  //     RequestApprovals: true,
  //     RequestVacation: true,
  //     RequestSalaryCertificate: true,
  //     RequestPaymentConfirmation: true,
  //     Employee: true,
  //   },
  // });
  // }

  async findPendingRequestsByRequester(requesterId: string) {
    return await this.requestRepository.findAll({
      where: { EmployeeId: requesterId, RequestStateId: 1, RequestTypeId: 1 },
    });
  }

  async findAllRequestByEmployee(
    EmployeeId: string,
    query: GetRequestsQueryDto,
  ) {
    const { options, page, limit } = buildRequestQuery(query, EmployeeId);

    const [data, totalItems] =
      await this.requestRepository.findAllWithCount(options);

    const totalPages = Math.ceil(totalItems / limit);

    return {
      data,
      page,
      limit,
      totalItems,
      totalPages,
    };
  }

  async remove(id: number) {
    const requestToRemove = await this.requestRepository.findOneById(id);

    if (!requestToRemove) {
      throw new NotFoundException('solicitud no encontrada');
    }

    return await this.requestRepository.remove(requestToRemove);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { RequestRepository } from './repository/request.repository';
import { RequestsStateService } from 'src/requests-state/requests-state.service';
import { EmployeesService } from 'src/employees/employees.service';
import { QueryRunner } from 'typeorm';
import { GetRequestsQueryDto } from './dto/get-requests-query.dto';
import { CancelRequestDto } from './dto/cancell-request.dto';

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
    const page = Number(query.page ?? 1);
    const limit = Number(query.limit ?? 10);

    const [data, totalItems] =
      await this.requestRepository.findAllByEmployeeWithFilters(query);

    const totalPages = Math.ceil(totalItems / limit);

    return {
      data,
      page,
      limit,
      totalItems,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    };
  }

  async findPendingRequestsByRequester(requesterId: string) {
    return await this.requestRepository.findAll({
      where: { EmployeeId: requesterId, RequestStateId: 1, RequestTypeId: 1 },
    });
  }

  async findAllRequestByEmployee(
    EmployeeId: string,
    query: GetRequestsQueryDto,
  ) {
    const page = Number(query.page ?? 1);
    const limit = Number(query.limit ?? 10);

    const [data, totalItems] =
      await this.requestRepository.findAllByEmployeeWithFilters(
        query,
        EmployeeId,
      );

    const totalPages = Math.ceil(totalItems / limit);

    return {
      data,
      page,
      limit,
      totalItems,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    };
    // const { options, page, limit } = buildRequestQuery(query, EmployeeId);

    // const [data, totalItems] =
    //   await this.requestRepository.findAllWithCount(options);

    // const totalPages = Math.ceil(totalItems / limit);

    // return {
    //   data,
    //   page,
    //   limit,
    //   totalItems,
    //   totalPages,
    //   hasNextPage: page < totalPages,
    //   hasPreviousPage: page > 1,
    // };
  }

  async remove(id: number) {
    const requestToRemove = await this.requestRepository.findOneById(id);

    if (!requestToRemove) {
      throw new NotFoundException('solicitud no encontrada');
    }

    return await this.requestRepository.remove(requestToRemove);
  }

  async cancelRequest(
    id: number,
    cancelRequestDto: CancelRequestDto,
    EmployeeId: string,
  ) {
    const requestToCancel = await this.requestRepository.findOne({
      where: { id, EmployeeId },
    });

    if (!requestToCancel) {
      throw new NotFoundException('Solicitud no encontrada');
    }

    const isAvaibleToCancel = requestToCancel.RequestStateId === 1;

    if (!isAvaibleToCancel) {
      throw new NotFoundException(
        'No se puede cancelar ya que ya fue procesada',
      );
    }

    requestToCancel.RequestStateId = 4; // 4 = Cancelada
    requestToCancel.CancelledReason = cancelRequestDto.CancelledReason;

    return await this.requestRepository.save(requestToCancel);
  }
}

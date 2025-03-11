import { Injectable } from '@nestjs/common';
import { RequestRepository } from 'src/requests/repository/request.repository';
import { RequestsSummaryDto } from 'src/analitics/dto/RequestsSummaryDto';
import { plainToClass } from 'class-transformer';
import { RequestStateRepository } from 'src/requests-state/repository/request-state.repository';
import { RequestTypeRepository } from 'src/request-types/repository/request-types.repository';
import { useAnalitics } from './helpers/useAnalitics';
import { GetTopEmployeesMostRequestsDto } from './dto/GetTopEmployeesMostRequestsDto';

@Injectable()
export class AnaliticsService {
  private analiticsHelper;
  constructor(
    private readonly requestRepository: RequestRepository,
    private readonly requestStateRepository: RequestStateRepository,
    private readonly requestTypeRepository: RequestTypeRepository,
  ) {
    this.analiticsHelper = useAnalitics(
      this.requestStateRepository,
      this.requestTypeRepository,
    );
  }

  async getRequestsSummary(): Promise<RequestsSummaryDto> {
    // Obtener total de solicitudes
    const totalRequests = await this.requestRepository.getTotalRequests();

    // Obtener cantidad de solicitudes por tipo
    const requestTypeCounts =
      await this.requestRepository.getRequestTypeCounts();

    // Obtener cantidad de solicitudes por estado
    const requestStatusCounts =
      await this.requestRepository.getRequestStatusCounts();

    // Mapear los datos obtenidos
    const vacationRequests = await this.analiticsHelper.mapRequestType(
      requestTypeCounts,
      1,
      totalRequests,
    );
    const salaryCertificateRequests = await this.analiticsHelper.mapRequestType(
      requestTypeCounts,
      2,
      totalRequests,
    );
    const paymentConfirmationRequests =
      await this.analiticsHelper.mapRequestType(
        requestTypeCounts,
        3,
        totalRequests,
      );

    const totalPending = await this.analiticsHelper.mapRequestStatus(
      requestStatusCounts,
      1,
    );
    const totalApproved = await this.analiticsHelper.mapRequestStatus(
      requestStatusCounts,
      2,
    );
    const totalRejected = await this.analiticsHelper.mapRequestStatus(
      requestStatusCounts,
      3,
    );

    return plainToClass(
      RequestsSummaryDto,
      {
        vacationRequests,
        salaryCertificateRequests,
        paymentConfirmationRequests,
        totalApproved,
        totalRejected,
        totalPending,
        totalRequests,
        lastUpdated: new Date(),
      },
      { excludeExtraneousValues: true },
    );
  }

  async employeesWithMostRequests(
    getTopEmployeesWithMostRequestsDto: GetTopEmployeesMostRequestsDto,
  ) {
    const { limit, month, year } = getTopEmployeesWithMostRequestsDto;
    return await this.requestRepository.getTopEmployeesWithMostRequests({
      limit,
      month,
      year,
    });
  }

  async avaiableMonthsAndYears() {
    const response = await this.requestRepository.getDates();
    return response;
  }
}

import { Injectable } from '@nestjs/common';
import { RequestRepository } from 'src/requests/repository/request.repository';
import { RequestsSummaryDto } from 'src/analitics/dto/RequestsSummaryDto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class AnaliticsService {
  constructor(private readonly requestRepository: RequestRepository) {}

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
    const vacationRequests = this.mapRequestType(
      requestTypeCounts,
      1,
      totalRequests,
    );
    const salaryCertificateRequests = this.mapRequestType(
      requestTypeCounts,
      2,
      totalRequests,
    );
    const paymentConfirmationRequests = this.mapRequestType(
      requestTypeCounts,
      3,
      totalRequests,
    );

    const totalPending = this.mapRequestStatus(requestStatusCounts, 1);
    const totalApproved = this.mapRequestStatus(requestStatusCounts, 2);
    const totalRejected = this.mapRequestStatus(requestStatusCounts, 3);

    // Retornar DTO
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

  private mapRequestType(data: any[], typeId: number, total: number) {
    const entry = data.find((d) => d.typeId === typeId);
    return {
      name: this.getRequestTypeName(typeId),
      total: entry ? parseInt(entry.total, 10) : 0,
      percentage: entry ? (parseInt(entry.total, 10) / total) * 100 : 0,
    };
  }

  private mapRequestStatus(data: any[], statusId: number) {
    const entry = data.find((d) => d.statusId === statusId);
    return {
      status: this.getRequestStatusName(statusId),
      total: entry ? parseInt(entry.total, 10) : 0,
    };
  }

  private getRequestTypeName(typeId: number): string {
    const types = {
      1: 'Vacaciones',
      2: 'Constancia salarial',
      3: 'Boleta de pago',
    };
    return types[typeId] || 'Unknown';
  }

  private getRequestStatusName(statusId: number): string {
    const statuses = { 1: 'Pendiente', 2: 'Aprovada', 3: 'Rechazada' };
    return statuses[statusId] || 'Unknown';
  }
}

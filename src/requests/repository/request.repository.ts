import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Request } from '../entities/request.entity';
import { BaseAbstractRepostitory } from 'src/core/generic-repository/repository/base.repository';
import { RequestRepositoryInterface } from './request.interface';
import { GetRequestsQueryDto } from '../dto/get-requests-query.dto';

export class RequestRepository
  extends BaseAbstractRepostitory<Request>
  implements RequestRepositoryInterface
{
  constructor(
    @InjectRepository(Request)
    private readonly requestGenericRepository: Repository<Request>,
  ) {
    super(requestGenericRepository);
  }

  async getTotalRequests() {
    return await this.requestGenericRepository.count();
  }

  async getRequestTypeCounts() {
    const response = await this.requestGenericRepository
      .createQueryBuilder('request')
      .select('request.RequestTypeId', 'typeId')
      .addSelect('COUNT(request.id)', 'total')
      .addSelect((subQuery) => {
        return subQuery
          .select('requesType.name')
          .from('request_type', 'requesType')
          .where('requesType.id = request.RequestTypeId');
      }, 'name')
      .groupBy('request.RequestTypeId')
      .getRawMany();
    return response;
  }

  async getRequestStatusCounts() {
    const response = await this.requestGenericRepository
      .createQueryBuilder('request')
      .select('request.RequestStateId', 'statusId')
      .addSelect('COUNT(request.id)', 'total')
      .addSelect((subQuery) => {
        return subQuery
          .select('requestState.Name', 'name')
          .from('requests_state', 'requestState')
          .where('requestState.id = request.RequestStateId');
      }, 'name')
      .groupBy('request.RequestStateId')
      .getRawMany();
    return response;
  }

  async getTopEmployeesWithMostRequests({
    limit,
    month,
    year,
  }: {
    limit: number;
    month: number;
    year: number;
  }) {
    return await this.requestGenericRepository
      .createQueryBuilder('request')
      .select('request.EmployeeId', 'employeeId')
      .addSelect('employee.Name', 'name')
      .addSelect('employee.Surname1', 'surname1')
      .addSelect('employee.Surname2', 'surname2')
      .addSelect('COUNT(request.id)', 'totalRequests')
      .innerJoin('request.Employee', 'employee') // Hacemos el JOIN directo
      .where('MONTH(request.date) = :month AND YEAR(request.date) = :year', {
        month,
        year,
      })
      .groupBy(
        'request.EmployeeId, employee.Name, employee.Surname1, employee.Surname2',
      )
      .orderBy('totalRequests', 'DESC')
      .limit(limit)
      .getRawMany();
  }

  async getPeakRequestTimes() {
    return await this.requestGenericRepository
      .createQueryBuilder('request')
      .select('HOUR(request.date)', 'hour')
      .addSelect('DAYOFWEEK(request.date)', 'dayOfWeek')
      .addSelect('COUNT(request.id)', 'totalRequests')
      .groupBy('HOUR(request.date), DAYOFWEEK(request.date)')
      .orderBy('totalRequests', 'DESC')
      .getRawMany();
  }

  async getDates() {
    const response = await this.requestGenericRepository
      .createQueryBuilder('request')
      .select('YEAR(request.date)', 'year')
      .addSelect(
        'GROUP_CONCAT(DISTINCT MONTH(request.date) ORDER BY MONTH(request.date))',
        'months',
      ) // 🔹 Agrupa los meses por año
      .groupBy('YEAR(request.date)')
      .orderBy('year', 'DESC')
      .getRawMany<{ year: number; months: string }>(); // 🔹 `months` será una string con valores separados por comas

    const formattedResult = response.map((entry) => ({
      year: entry.year,
      months: entry.months.split(',').map(Number), // 🔹 Convierte la string "3,4" en [3,4]
    }));

    return formattedResult;
  }

  async getAvailableYearsWithMonths() {
    const rawData = await this.requestGenericRepository
      .createQueryBuilder('request')
      .select('YEAR(request.date)', 'year')
      .addSelect('MONTH(request.date)', 'month')
      .distinctOn(['YEAR(request.date)', 'MONTH(request.date)']) // Evita duplicados a nivel de BD
      .orderBy('year', 'DESC')
      .addOrderBy('month', 'ASC')
      .getRawMany<{ year: number; month: number }>(); // Definir tipo correctamente

    // Agrupar por año eliminando duplicados
    const groupedData: Record<number, Set<number>> = {}; // Usamos Set para eliminar duplicados

    rawData.forEach(({ year, month }) => {
      if (!groupedData[year]) {
        groupedData[year] = new Set(); // Inicializamos como un Set para evitar duplicados
      }
      groupedData[year].add(month);
    });

    // Convertir en array de objetos con meses únicos
    return Object.entries(groupedData).map(([year, months]) => ({
      year: Number(year),
      months: Array.from(months).sort((a, b) => a - b), // Convertimos Set a Array y ordenamos
    }));
  }

  async getApprovalRateByDepartment() {
    return await this.requestGenericRepository
      .createQueryBuilder('request')
      .select('request.RequestTypeId', 'RequestTypeId')
      .addSelect(
        'COUNT(CASE WHEN request.RequestStateId = 2 THEN 1 END) * 100.0 / COUNT(request.id)',
        'rejectionRate',
      )
      .groupBy('request.RequestTypeId')
      .getRawMany();
  }

  async findAllWithCount(options: FindManyOptions<Request>) {
    return this.requestGenericRepository.findAndCount(options);
  }

  // src/requests/request.repository.ts

  async findAllByEmployeeWithFilters(
    query: GetRequestsQueryDto,
    employeeId?: string,
  ): Promise<[Request[], number]> {
    const {
      page = 1,
      limit = 10,
      RequestStateId,
      RequestTypeId,
      startDate,
      endDate,
    } = query;

    const take = Number(limit);
    const skip = (Number(page) - 1) * take;

    const qb = this.requestGenericRepository
      .createQueryBuilder('request')
      .withDeleted() // <-- solo aplica a request
      .leftJoinAndSelect('request.RequestApprovals', 'approval')
      .leftJoinAndSelect('request.RequestType', 'requestType')
      .leftJoinAndSelect('request.RequestStatus', 'requestStatus')
      .leftJoinAndSelect('request.RequestVacation', 'vacation')
      .leftJoinAndSelect('request.RequestSalaryCertificate', 'salary')
      .leftJoinAndSelect('request.RequestPaymentConfirmation', 'payment')
      .leftJoinAndSelect('approval.approver', 'approver', undefined, {
        withDeleted: true,
      })
      .orderBy('request.date', 'DESC')
      .skip(skip)
      .take(take);

    if (employeeId) {
      qb.where('request.employeeId = :employeeId', { employeeId });
    } else {
      qb.where('1 = 1');
    }

    if (RequestStateId) {
      qb.andWhere('request.requestStateId = :RequestStateId', {
        RequestStateId,
      });
    }

    if (RequestTypeId) {
      qb.andWhere('request.requestTypeId = :RequestTypeId', { RequestTypeId });
    }

    if (startDate && endDate) {
      qb.andWhere('request.date BETWEEN :start AND :end', {
        start: new Date(startDate),
        end: new Date(endDate),
      });
    } else if (startDate) {
      qb.andWhere('request.date >= :start', { start: new Date(startDate) });
    } else if (endDate) {
      qb.andWhere('request.date <= :end', { end: new Date(endDate) });
    }

    const [data, totalItems] = await qb.getManyAndCount();
    return [data, totalItems];
  }
}

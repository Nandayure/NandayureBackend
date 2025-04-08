import {
  Between,
  FindManyOptions,
  LessThanOrEqual,
  MoreThanOrEqual,
} from 'typeorm';
import { GetRequestsQueryDto } from '../dto/get-requests-query.dto';
import { Request } from '../entities/request.entity'; // ajustá si usás otro path

export function buildRequestQuery(
  query: GetRequestsQueryDto,
  EmployeeId?: string,
): {
  options: FindManyOptions<Request>;
  page: number;
  limit: number;
} {
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

  const where: any = {};

  if (EmployeeId) {
    where.EmployeeId = EmployeeId;
  }

  if (RequestStateId) where.RequestStateId = RequestStateId;
  if (RequestTypeId) where.RequestTypeId = RequestTypeId;

  if (startDate && endDate) {
    where.date = Between(new Date(startDate), new Date(endDate));
  } else if (startDate) {
    where.date = MoreThanOrEqual(new Date(startDate));
  } else if (endDate) {
    where.date = LessThanOrEqual(new Date(endDate));
  }

  const options: FindManyOptions<Request> = {
    where,
    relations: {
      RequestApprovals: true,
      RequestVacation: true,
      RequestSalaryCertificate: true,
      RequestPaymentConfirmation: true,
      Employee: true,
    },
    take,
    skip,
    order: {
      date: 'DESC',
    },
  };

  return {
    options,
    page: Number(page),
    limit: take,
  };
}

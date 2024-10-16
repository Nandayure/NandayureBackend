import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RequestSalaryCertificate } from '../entities/request-salary-certificate.entity';
import { BaseAbstractRepostitory } from 'src/core/generic-repository/repository/base.repository';
import { RequestSalaryCertificateRepositoryInterface } from './RequestSalaryCertificate.Interface';

export class RequestSalaryCertificateRepository
  extends BaseAbstractRepostitory<RequestSalaryCertificate>
  implements RequestSalaryCertificateRepositoryInterface
{
  constructor(
    @InjectRepository(RequestSalaryCertificate)
    private readonly requestSalaryCertificateGenericRepository: Repository<RequestSalaryCertificate>,
  ) {
    super(requestSalaryCertificateGenericRepository);
  }
}

import { Module } from '@nestjs/common';
import { RequestSalaryCertificatesService } from './request-salary-certificates.service';
import { RequestSalaryCertificatesController } from './request-salary-certificates.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestSalaryCertificate } from './entities/request-salary-certificate.entity';
import { RequestSalaryCertificateRepository } from './repository/RequestSalaryCertificate.repository';
import { DepartmentsModule } from 'src/departments/departments.module';
import { EmployeesModule } from 'src/employees/employees.module';
import { MailClientModule } from 'src/mail-client/mail-client.module';
import { RequestApprovalsModule } from 'src/request-approvals/request-approvals.module';
import { RequestsModule } from 'src/requests/requests.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RequestSalaryCertificate]),
    EmployeesModule,
    DepartmentsModule,
    RequestsModule,
    MailClientModule,
    RequestApprovalsModule,
  ],
  controllers: [RequestSalaryCertificatesController],
  providers: [
    RequestSalaryCertificatesService,
    RequestSalaryCertificateRepository,
  ],
  exports: [RequestSalaryCertificatesService],
})
export class RequestSalaryCertificatesModule {}

import { Module } from '@nestjs/common';
import { RequestPaymentConfirmationsService } from './request-payment-confirmations.service';
import { RequestPaymentConfirmationsController } from './request-payment-confirmations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestPaymentConfirmation } from './entities/request-payment-confirmation.entity';
import { RequestPaymentConfirmationRepository } from './repository/RequestPaymentConfirmation.repository';
import { EmployeesModule } from 'src/employees/employees.module';
import { DepartmentsModule } from 'src/departments/departments.module';
import { RequestsModule } from 'src/requests/requests.module';
import { MailClientModule } from 'src/mail-client/mail-client.module';
import { RequestApprovalsModule } from 'src/request-approvals/request-approvals.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RequestPaymentConfirmation]),
    EmployeesModule,
    DepartmentsModule,
    RequestsModule,
    MailClientModule,
    RequestApprovalsModule,
  ],
  controllers: [RequestPaymentConfirmationsController],
  providers: [
    RequestPaymentConfirmationsService,
    RequestPaymentConfirmationRepository,
  ],
  exports: [RequestPaymentConfirmationsService],
})
export class RequestPaymentConfirmationsModule {}

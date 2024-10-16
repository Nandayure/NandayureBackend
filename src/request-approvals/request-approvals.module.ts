import { Module } from '@nestjs/common';
import { RequestApprovalsService } from './request-approvals.service';
import { RequestApprovalsController } from './request-approvals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestApproval } from './entities/request-approval.entity';
import { RequestApprovalRepository } from './repository/request-approvals.repository';
import { RequestsModule } from 'src/requests/requests.module';
import { EmployeesModule } from 'src/employees/employees.module';

import { MailClientModule } from 'src/mail-client/mail-client.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RequestApproval]),
    RequestsModule,
    EmployeesModule,
    MailClientModule,
  ],
  controllers: [RequestApprovalsController],
  providers: [RequestApprovalsService, RequestApprovalRepository],
  exports: [RequestApprovalsService, RequestApprovalRepository],
})
export class RequestApprovalsModule {}

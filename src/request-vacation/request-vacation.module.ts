import { Module } from '@nestjs/common';
import { RequestVacationService } from './request-vacation.service';
import { RequestVacationController } from './request-vacation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestVacation } from './entities/request-vacation.entity';
import { RequestVacationRepository } from './repository/Request-Vacation.repository';
import { RequestsModule } from 'src/requests/requests.module';
import { EmployeesModule } from 'src/employees/employees.module';
import { DepartmentsModule } from 'src/departments/departments.module';
import { RequestApprovalsModule } from 'src/request-approvals/request-approvals.module';
import { MailClientModule } from 'src/mail-client/mail-client.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RequestVacation]),
    RequestsModule,
    EmployeesModule,
    RequestApprovalsModule,
    DepartmentsModule,
    MailClientModule,
  ],
  controllers: [RequestVacationController],
  providers: [RequestVacationService, RequestVacationRepository],
  exports: [RequestVacationService],
})
export class RequestVacationModule {}

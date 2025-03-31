import { Module } from '@nestjs/common';
import { RequestVacationService } from './request-vacation.service';
import { RequestVacationController } from './request-vacation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestVacation } from './entities/request-vacation.entity';
import { requestVacationRepository } from './repository/request-vacations.repository';
import { RequestsModule } from 'src/requests/requests.module';
import { EmployeesModule } from 'src/employees/employees.module';
import { DepartmentsModule } from 'src/departments/departments.module';
import { RequestApprovalsModule } from 'src/request-approvals/request-approvals.module';
import { MailClientModule } from 'src/mail-client/mail-client.module';
import { RolesModule } from 'src/roles/roles.module';
import { HolidaysModule } from 'src/holidays/holidays.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RequestVacation]),
    RequestsModule,
    EmployeesModule,
    RequestApprovalsModule,
    DepartmentsModule,
    MailClientModule,
    RolesModule,
    HolidaysModule,
  ],
  controllers: [RequestVacationController],
  providers: [RequestVacationService, requestVacationRepository],
  exports: [RequestVacationService],
})
export class RequestVacationModule {}

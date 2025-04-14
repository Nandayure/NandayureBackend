import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { EmployeesModule } from './employees/employees.module';
import { MaritalStatusModule } from './marital-status/marital-status.module';
import { GendersModule } from './genders/genders.module';
import { MunicipalityModule } from './municipality/municipality.module';
import { JobPositionsModule } from './job-positions/job-positions.module';
import { TrainingsModule } from './trainings/trainings.module';
import { AttendanceModule } from './attendance/attendance.module';
import { AttendanceStatusModule } from './attendance-status/attendance-status.module';
import { StudiesModule } from './studies/studies.module';
import { StudiesCategoryModule } from './studies-category/studies-category.module';
import { RequestsModule } from './requests/requests.module';
import { RequestsStateModule } from './requests-state/requests-state.module';
import { RequestVacationModule } from './request-vacation/request-vacation.module';
import { RequestSalaryCertificatesModule } from './request-salary-certificates/request-salary-certificates.module';
import { RequestPaymentConfirmationsModule } from './request-payment-confirmations/request-payment-confirmations.module';
import { DepartmentsModule } from './departments/departments.module';
import { DepartmentProgramsModule } from './department-programs/department-programs.module';
import { DbModule } from './db/db.module';
import { RequestApprovalsModule } from './request-approvals/request-approvals.module';
import { RequestTypesModule } from './request-types/request-types.module';
import { EmployeesStateModule } from './employees-state/employees-state.module';
import { GoogleDriveFilesModule } from './google-drive-files/google-drive-files.module';
import { DriveFolderModule } from './drive-folder/drive-folder.module';
import { FaqCategoriesModule } from './faq-categories/faq-categories.module';
import { FaqsModule } from './faqs/faqs.module';
import { AnaliticsModule } from './analitics/analitics.module';
import { HolidaysModule } from './holidays/holidays.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      expandVariables: true,
    }),
    DbModule,
    CacheModule.register({ isGlobal: true }),
    AuthModule,
    UsersModule,
    EmployeesModule,
    MaritalStatusModule,
    GendersModule,
    MunicipalityModule,
    JobPositionsModule,
    TrainingsModule,

    AttendanceModule,
    AttendanceStatusModule,
    StudiesModule,
    StudiesCategoryModule,
    RequestsModule,
    RequestsStateModule,
    RequestVacationModule,
    RequestSalaryCertificatesModule,
    RequestPaymentConfirmationsModule,
    DepartmentsModule,
    DepartmentProgramsModule,
    RequestApprovalsModule,
    RequestTypesModule,
    EmployeesStateModule,
    GoogleDriveFilesModule,
    DriveFolderModule,
    FaqCategoriesModule,
    FaqsModule,
    AnaliticsModule,
    HolidaysModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

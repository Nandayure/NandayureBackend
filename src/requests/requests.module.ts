import { forwardRef, Module } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Request } from './entities/request.entity';
import { RequestRepository } from './repository/request.repository';
import { RequestsStateModule } from 'src/requests-state/requests-state.module';
import { EmployeesModule } from 'src/employees/employees.module';
import { RequestApprovalsModule } from 'src/request-approvals/request-approvals.module';
import { MailClientModule } from 'src/mail-client/mail-client.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Request]),
    RequestsStateModule,
    EmployeesModule,
    MailClientModule,
    forwardRef(() => RequestApprovalsModule),
  ],
  controllers: [RequestsController],
  providers: [RequestsService, RequestRepository],
  exports: [RequestsService, RequestRepository],
})
export class RequestsModule {}

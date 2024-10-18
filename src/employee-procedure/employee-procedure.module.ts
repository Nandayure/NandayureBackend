import { Module } from '@nestjs/common';
import { EmployeeProcedureService } from './employee-procedure.service';
import { EmployeeProcedureController } from './employee-procedure.controller';

@Module({
  controllers: [EmployeeProcedureController],
  providers: [EmployeeProcedureService],
})
export class EmployeeProcedureModule {}

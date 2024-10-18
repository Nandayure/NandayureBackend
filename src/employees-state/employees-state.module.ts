import { Module } from '@nestjs/common';
import { EmployeesStateService } from './employees-state.service';
import { EmployeesStateController } from './employees-state.controller';

@Module({
  controllers: [EmployeesStateController],
  providers: [EmployeesStateService],
})
export class EmployeesStateModule {}

import { Module } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { DepartmentsController } from './departments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';
import { DepartmentRepository } from './repository/Department.repository';
import { EmployeesModule } from 'src/employees/employees.module';
import { MailClientModule } from 'src/mail-client/mail-client.module';

@Module({
  imports: [TypeOrmModule.forFeature([Department]), MailClientModule],
  controllers: [DepartmentsController],
  providers: [DepartmentsService, DepartmentRepository],
  exports: [DepartmentsService],
})
export class DepartmentsModule {}

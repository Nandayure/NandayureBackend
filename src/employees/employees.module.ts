import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { UsersModule } from 'src/users/users.module';
import { EmployeeRepository } from './repository/employee.repository';
import { MaritalStatusModule } from 'src/marital-status/marital-status.module';
import { GendersModule } from 'src/genders/genders.module';
import { JobPositionsModule } from 'src/job-positions/job-positions.module';
import { GoogleDriveFilesModule } from 'src/google-drive-files/google-drive-files.module';
import { DriveFolderModule } from 'src/drive-folder/drive-folder.module';
//import { DriveFolderModule } from 'src/drive-folder/drive-folder.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee]),
    UsersModule,
    MaritalStatusModule,
    GendersModule,
    JobPositionsModule,
    GoogleDriveFilesModule,
    DriveFolderModule,
  ],
  controllers: [EmployeesController],
  providers: [EmployeesService, EmployeeRepository],
  exports: [EmployeesService],
})
export class EmployeesModule {}

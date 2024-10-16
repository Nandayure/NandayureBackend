import { Module } from '@nestjs/common';
import { DepartmentProgramsService } from './department-programs.service';
import { DepartmentProgramsController } from './department-programs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentProgram } from './entities/department-program.entity';
import { DepartmentProgramRepository } from './repository/DepartmentProgram.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DepartmentProgram])],
  controllers: [DepartmentProgramsController],
  providers: [DepartmentProgramsService, DepartmentProgramRepository],
  exports: [DepartmentProgramsService],
})
export class DepartmentProgramsModule {}

import { Module } from '@nestjs/common';
import { AttendanceStatusService } from './attendance-status.service';
import { AttendanceStatusController } from './attendance-status.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendanceStatus } from './entities/attendance-status.entity';
import { AttendanceStatusRepository } from './repository/attendance-status.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AttendanceStatus])],
  controllers: [AttendanceStatusController],
  providers: [AttendanceStatusService, AttendanceStatusRepository],
  exports: [AttendanceStatusService],
})
export class AttendanceStatusModule {}

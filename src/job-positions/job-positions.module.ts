import { Module } from '@nestjs/common';
import { JobPositionsService } from './job-positions.service';
import { JobPositionsController } from './job-positions.controller';
import { JobPositionRepository } from './repository/job-position.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobPosition } from './entities/job-position.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JobPosition])],
  controllers: [JobPositionsController],
  providers: [JobPositionsService, JobPositionRepository],
  exports: [JobPositionsService],
})
export class JobPositionsModule {}

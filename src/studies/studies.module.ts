import { Module } from '@nestjs/common';
import { StudiesService } from './studies.service';
import { StudiesController } from './studies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Study } from './entities/study.entity';
import { StudyRepository } from './repository/study.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Study])],
  controllers: [StudiesController],
  providers: [StudiesService, StudyRepository],
  exports: [StudiesService],
})
export class StudiesModule {}

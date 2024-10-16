import { Module } from '@nestjs/common';
import { LaborCodeRegulationsService } from './labor-code-regulations.service';
import { LaborCodeRegulationsController } from './labor-code-regulations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LaborCodeRegulation } from './entities/labor-code-regulation.entity';
import { LaborCodeRegulationRepository } from './repository/LaborCodeRegulation.repository';

@Module({
  imports: [TypeOrmModule.forFeature([LaborCodeRegulation])],
  controllers: [LaborCodeRegulationsController],
  providers: [LaborCodeRegulationsService, LaborCodeRegulationRepository],
  exports: [LaborCodeRegulationsService],
})
export class LaborCodeRegulationsModule {}

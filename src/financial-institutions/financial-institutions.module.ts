import { Module } from '@nestjs/common';
import { FinancialInstitutionsService } from './financial-institutions.service';
import { FinancialInstitutionsController } from './financial-institutions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinancialInstitution } from './entities/financial-institution.entity';
import { FinancialInstitutionRepository } from './repository/FinancialInstitution.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FinancialInstitution])],
  controllers: [FinancialInstitutionsController],
  providers: [FinancialInstitutionsService, FinancialInstitutionRepository],
  exports: [FinancialInstitutionsService],
})
export class FinancialInstitutionsModule {}

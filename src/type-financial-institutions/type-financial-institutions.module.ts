import { Module } from '@nestjs/common';
import { TypeFinancialInstitutionsService } from './type-financial-institutions.service';
import { TypeFinancialInstitutionsController } from './type-financial-institutions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeFinancialInstitution } from './entities/type-financial-institution.entity';
import { TypeFinancialInstitutionRepository } from './repository/TypeFinancialInstitution.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TypeFinancialInstitution])],
  controllers: [TypeFinancialInstitutionsController],
  providers: [
    TypeFinancialInstitutionsService,
    TypeFinancialInstitutionRepository,
  ],
  exports: [TypeFinancialInstitutionsService],
})
export class TypeFinancialInstitutionsModule {}

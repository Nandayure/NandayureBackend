import { Module } from '@nestjs/common';
import { BudgetCodesService } from './budget-codes.service';
import { BudgetCodesController } from './budget-codes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BudgetCode } from './entities/budget-code.entity';
import { BudgetCodeRepository } from './repository/BudgetCode.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BudgetCode])],
  controllers: [BudgetCodesController],
  providers: [BudgetCodesService, BudgetCodeRepository],
  exports: [BudgetCodesService],
})
export class BudgetCodesModule {}

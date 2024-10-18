import { Module } from '@nestjs/common';
import { PayrollDetailService } from './payroll-detail.service';
import { PayrollDetailController } from './payroll-detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PayrollDetail } from './entities/payroll-detail.entity';
import { PayrollDetailRepository } from './repository/payroll-detail.repository';
import { PayrollModule } from 'src/payroll/payroll.module';

@Module({
  imports: [TypeOrmModule.forFeature([PayrollDetail]), PayrollModule],
  controllers: [PayrollDetailController],
  providers: [PayrollDetailService, PayrollDetailRepository],
  exports: [PayrollDetailService],
})
export class PayrollDetailModule {}

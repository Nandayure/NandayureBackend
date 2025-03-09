import { Module } from '@nestjs/common';
import { AnaliticsService } from './analitics.service';
import { AnaliticsController } from './analitics.controller';
import { RequestsModule } from 'src/requests/requests.module';
import { RequestApprovalsModule } from 'src/request-approvals/request-approvals.module';

@Module({
  imports: [RequestsModule, RequestApprovalsModule],
  controllers: [AnaliticsController],
  providers: [AnaliticsService],
})
export class AnaliticsModule {}

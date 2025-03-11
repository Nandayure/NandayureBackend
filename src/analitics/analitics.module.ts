import { Module } from '@nestjs/common';
import { AnaliticsService } from './analitics.service';
import { AnaliticsController } from './analitics.controller';
import { RequestsModule } from 'src/requests/requests.module';
import { RequestApprovalsModule } from 'src/request-approvals/request-approvals.module';
import { RequestTypesModule } from 'src/request-types/request-types.module';
import { RequestsStateModule } from 'src/requests-state/requests-state.module';

@Module({
  imports: [
    RequestsModule,
    RequestApprovalsModule,
    RequestTypesModule,
    RequestsStateModule,
  ],
  controllers: [AnaliticsController],
  providers: [AnaliticsService],
})
export class AnaliticsModule {}

import { Module } from '@nestjs/common';
import { RequestsStateService } from './requests-state.service';
import { RequestsStateController } from './requests-state.controller';
import { RequestStateRepository } from './repository/request-state.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestsState } from './entities/requests-state.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RequestsState])],
  controllers: [RequestsStateController],
  providers: [RequestsStateService, RequestStateRepository],
  exports: [RequestsStateService],
})
export class RequestsStateModule {}

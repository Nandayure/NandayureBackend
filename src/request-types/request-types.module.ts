import { Module } from '@nestjs/common';
import { RequestTypesService } from './request-types.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestType } from './entities/request-type.entity';
import { RequestTypeRepository } from './repository/request-types.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RequestType])],
  providers: [RequestTypesService, RequestTypeRepository],
  exports: [RequestTypesService],
})
export class RequestTypesModule {}

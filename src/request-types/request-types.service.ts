import { Injectable } from '@nestjs/common';
import { CreateRequestTypeDto } from './dto/create-request-type.dto';
import { UpdateRequestTypeDto } from './dto/update-request-type.dto';

@Injectable()
export class RequestTypesService {
  create(createRequestTypeDto: CreateRequestTypeDto) {
    return 'This action adds a new requestType';
  }

  findAll() {
    return `This action returns all requestTypes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} requestType`;
  }

  update(id: number, updateRequestTypeDto: UpdateRequestTypeDto) {
    return `This action updates a #${id} requestType`;
  }

  remove(id: number) {
    return `This action removes a #${id} requestType`;
  }
}

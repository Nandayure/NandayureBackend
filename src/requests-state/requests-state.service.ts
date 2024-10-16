import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRequestsStateDto } from './dto/create-requests-state.dto';
import { UpdateRequestsStateDto } from './dto/update-requests-state.dto';
import { RequestStateRepository } from './repository/request-state.repository';

@Injectable()
export class RequestsStateService {
  constructor(
    private readonly requestStateRepository: RequestStateRepository,
  ) {}
  async create(createRequestsStateDto: CreateRequestsStateDto) {
    const newState = this.requestStateRepository.create(createRequestsStateDto);

    return await this.requestStateRepository.save(newState);
  }

  async findAll() {
    return await this.requestStateRepository.findAll();
  }

  async findOne(id: number) {
    return await this.requestStateRepository.findOneById(id);
  }

  async update(id: number, updateRequestsStateDto: UpdateRequestsStateDto) {
    const stateToEdit = await this.requestStateRepository.findOneById(id);
    if (!stateToEdit) {
      throw new NotFoundException('Estado no encontrado');
    }

    return await this.requestStateRepository.save({
      ...stateToEdit,
      ...updateRequestsStateDto,
    });
  }

  async remove(id: number) {
    const stateToRemove = await this.requestStateRepository.findOneById(id);
    if (!stateToRemove) {
      throw new NotFoundException('Estado no encontrado');
    }

    return await this.requestStateRepository.remove(stateToRemove);
  }
}

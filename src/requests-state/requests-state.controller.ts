import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RequestsStateService } from './requests-state.service';
import { CreateRequestsStateDto } from './dto/create-requests-state.dto';
import { UpdateRequestsStateDto } from './dto/update-requests-state.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
@ApiTags('requests-state')
@Controller('requests-state')
@UseGuards(AuthGuard)
export class RequestsStateController {
  constructor(private readonly requestsStateService: RequestsStateService) {}

  @Post()
  create(@Body() createRequestsStateDto: CreateRequestsStateDto) {
    return this.requestsStateService.create(createRequestsStateDto);
  }

  @Get()
  findAll() {
    return this.requestsStateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requestsStateService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRequestsStateDto: UpdateRequestsStateDto,
  ) {
    return this.requestsStateService.update(+id, updateRequestsStateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requestsStateService.remove(+id);
  }
}

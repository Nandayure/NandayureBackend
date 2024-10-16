import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RequestVacationService } from './request-vacation.service';
import { CreateRequestVacationDto } from './dto/create-request-vacation.dto';
import { UpdateRequestVacationDto } from './dto/update-request-vacation.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
@ApiTags('request-vacation')
@Controller('request-vacation')
export class RequestVacationController {
  constructor(
    private readonly requestVacationService: RequestVacationService,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  create(
    @Req() req,
    @Body() createRequestVacationDto: CreateRequestVacationDto,
  ) {
    return this.requestVacationService.create(
      createRequestVacationDto,
      req.user.id,
    );
  }

  @Get()
  findAll() {
    return this.requestVacationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requestVacationService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRequestVacationDto: UpdateRequestVacationDto,
  ) {
    return this.requestVacationService.update(+id, updateRequestVacationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requestVacationService.remove(+id);
  }
}

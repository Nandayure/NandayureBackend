import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RequestVacationService } from './request-vacation.service';
import { CreateRequestVacationDto } from './dto/create-request-vacation.dto';
// import { UpdateRequestVacationDto } from './dto/update-request-vacation.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { GetAvailableDaysDto } from './dto/get-avaible-days.dto';

@ApiTags('request-vacation')
@Controller('request-vacation')
@UseGuards(AuthGuard)
export class RequestVacationController {
  constructor(
    private readonly requestVacationService: RequestVacationService,
  ) {}

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

  @Post('calculateRequestDays')
  calculate(@Body() getAvailableDaysDto: GetAvailableDaysDto) {
    return this.requestVacationService.calculateAvaiableDays(
      getAvailableDaysDto.startDate,
      getAvailableDaysDto.endDate,
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

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateRequestVacationDto: UpdateRequestVacationDto,
  // ) {
  //   return this.requestVacationService.update(+id, updateRequestVacationDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requestVacationService.remove(+id);
  }
}

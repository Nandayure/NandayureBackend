import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { JobPositionsService } from './job-positions.service';
import { CreateJobPositionDto } from './dto/create-job-position.dto';
import { UpdateJobPositionDto } from './dto/update-job-position.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { GetJobPositionFilterDto } from './dto/get-jobPosition-filter.dto';
@ApiTags('job-positions')
@Controller('job-positions')
@UseGuards(AuthGuard)
export class JobPositionsController {
  constructor(private readonly jobPositionsService: JobPositionsService) {}

  @Post()
  create(@Body() createJobPositionDto: CreateJobPositionDto) {
    return this.jobPositionsService.create(createJobPositionDto);
  }

  @Get()
  findAll(@Query() getJobPositionFilterDto: GetJobPositionFilterDto) {
    return this.jobPositionsService.findAll(getJobPositionFilterDto);
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.jobPositionsService.findOneById(+id);
  }

  @Get(':Name')
  findOneByName(@Param('Name') Name: string) {
    return this.jobPositionsService.findOneByName(Name);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateJobPositionDto: UpdateJobPositionDto,
  ) {
    return this.jobPositionsService.update(+id, updateJobPositionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobPositionsService.remove(+id);
  }
}

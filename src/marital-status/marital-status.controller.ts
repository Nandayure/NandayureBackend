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
import { MaritalStatusService } from './marital-status.service';
import { CreateMaritalStatusDto } from './dto/create-marital-status.dto';
import { UpdateMaritalStatusDto } from './dto/update-marital-status.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@ApiTags('marital-status')
@Controller('marital-status')
@UseGuards(AuthGuard)
export class MaritalStatusController {
  constructor(private readonly maritalStatusService: MaritalStatusService) {}

  @Post()
  create(@Body() createMaritalStatusDto: CreateMaritalStatusDto) {
    return this.maritalStatusService.create(createMaritalStatusDto);
  }

  @Get()
  findAll() {
    return this.maritalStatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return id; //this.maritalStatusService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMaritalStatusDto: UpdateMaritalStatusDto,
  ) {
    return this.maritalStatusService.update(+id, updateMaritalStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.maritalStatusService.remove(+id);
  }
}

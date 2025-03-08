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
import { OvertimesService } from './overtimes.service';
import { CreateOvertimeDto } from './dto/create-overtime.dto';
import { UpdateOvertimeDto } from './dto/update-overtime.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
@ApiTags('overtimes')
@Controller('overtimes')
@UseGuards(AuthGuard)
export class OvertimesController {
  constructor(private readonly overtimesService: OvertimesService) {}

  @Post()
  create(@Body() createOvertimeDto: CreateOvertimeDto) {
    return this.overtimesService.create(createOvertimeDto);
  }

  @Get()
  findAll() {
    return this.overtimesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.overtimesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOvertimeDto: UpdateOvertimeDto,
  ) {
    return this.overtimesService.update(+id, updateOvertimeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.overtimesService.remove(+id);
  }
}

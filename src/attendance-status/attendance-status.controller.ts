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
import { AttendanceStatusService } from './attendance-status.service';
import { CreateAttendanceStatusDto } from './dto/create-attendance-status.dto';
import { UpdateAttendanceStatusDto } from './dto/update-attendance-status.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
@ApiTags('attendance-status')
@Controller('attendance-status')
@UseGuards(AuthGuard)
export class AttendanceStatusController {
  constructor(
    private readonly attendanceStatusService: AttendanceStatusService,
  ) {}

  @Post()
  create(@Body() createAttendanceStatusDto: CreateAttendanceStatusDto) {
    return this.attendanceStatusService.create(createAttendanceStatusDto);
  }

  @Get()
  findAll() {
    return this.attendanceStatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attendanceStatusService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAttendanceStatusDto: UpdateAttendanceStatusDto,
  ) {
    return this.attendanceStatusService.update(+id, updateAttendanceStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attendanceStatusService.remove(+id);
  }
}

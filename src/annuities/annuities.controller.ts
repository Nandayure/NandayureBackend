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
import { AnnuitiesService } from './annuities.service';
import { CreateAnnuityDto } from './dto/create-annuity.dto';
import { UpdateAnnuityDto } from './dto/update-annuity.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
@ApiTags('annuites')
@Controller('annuities')
@UseGuards(AuthGuard)
export class AnnuitiesController {
  constructor(private readonly annuitiesService: AnnuitiesService) {}

  @Post()
  create(@Body() createAnnuityDto: CreateAnnuityDto) {
    return this.annuitiesService.create(createAnnuityDto);
  }

  @Get()
  findAll() {
    return this.annuitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.annuitiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnnuityDto: UpdateAnnuityDto) {
    return this.annuitiesService.update(+id, updateAnnuityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.annuitiesService.remove(+id);
  }
}

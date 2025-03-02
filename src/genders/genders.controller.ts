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
import { GendersService } from './genders.service';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
@ApiTags('genders')
@Controller('genders')
@UseGuards(AuthGuard)
export class GendersController {
  constructor(private readonly gendersService: GendersService) {}

  @Post()
  create(@Body() createGenderDto: CreateGenderDto) {
    return this.gendersService.create(createGenderDto);
  }

  @Get()
  findAll() {
    return this.gendersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return id; //this.gendersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGenderDto: UpdateGenderDto) {
    return this.gendersService.update(+id, updateGenderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gendersService.remove(+id);
  }
}

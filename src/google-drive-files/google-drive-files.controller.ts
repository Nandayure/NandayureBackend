import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GoogleDriveFilesService } from './google-drive-files.service';
import { CreateGoogleDriveFileDto } from './dto/create-google-drive-file.dto';
import { UpdateGoogleDriveFileDto } from './dto/update-google-drive-file.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('google-drive-files')
@Controller('google-drive-files')
export class GoogleDriveFilesController {
  constructor(
    private readonly googleDriveFilesService: GoogleDriveFilesService,
  ) {}

  @Post()
  async createFolder(@Body() createFolder: CreateGoogleDriveFileDto) {
    return await this.googleDriveFilesService.createFolder(createFolder);
    // Asegúrate de retornar un objeto JSON válido
  }

  // @Get()
  // findAll() {
  //   return this.googleDriveFilesService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.googleDriveFilesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateGoogleDriveFileDto: UpdateGoogleDriveFileDto,
  // ) {
  //   return this.googleDriveFilesService.update(+id, updateGoogleDriveFileDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.googleDriveFilesService.remove(+id);
  // }

  @Get('files')
  async getFiles() {
    console.log('Listando archivos...');
    const files = await this.googleDriveFilesService.listFiles();
    return files; // Devuelve la lista de archivos
  }
}

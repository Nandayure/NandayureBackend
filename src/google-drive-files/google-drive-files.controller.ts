import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  // Param,
  // Delete,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFile,
  ConflictException,
  Param,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { GoogleDriveFilesService } from './google-drive-files.service';
import { CreateGoogleDriveFileDto } from './dto/create-google-drive-file.dto';
//import { UpdateGoogleDriveFileDto } from './dto/update-google-drive-file.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
@ApiTags('google-drive-files')
@Controller('google-drive-files')
export class GoogleDriveFilesController {
  constructor(
    private readonly googleDriveFilesService: GoogleDriveFilesService,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async createFolder(
    @Body() createGoogleDriveFileDto: CreateGoogleDriveFileDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new ConflictException('No se ha subido ningún archivo');
    }
    //console.log(file);
    const resultado = await this.googleDriveFilesService.createFile(
      createGoogleDriveFileDto,
      file,
    );
    return {
      mensaje: 'Archivo PDF subido con éxito',
      archivo: resultado,
    };
  }

  @UseGuards(AuthGuard)
  @Get('MyFiles')
  findAll(@Req() req) {
    return this.googleDriveFilesService.findMyAllFiles(req.user.id);
  }

  @UseGuards(AuthGuard)
  @Get('FilesByEmployee/:employeeId')
  findAllByUser(@Param('employeeId') employeeId: string) {
    return this.googleDriveFilesService.findAllFilesByUser(employeeId);
  }

  @Get('getFile/:fileId')
  async downloadPdfFile(@Param('fileId') fileId: string, @Res() res: Response) {
    return this.googleDriveFilesService.downloadFile(fileId, res);
  }

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

  // @Get('files')
  // async getFiles() {
  //   console.log('Listando archivos...');
  //   const files = await this.googleDriveFilesService.listFiles();
  //   return files; // Devuelve la lista de archivos
  // }
}

import { Response } from 'express';
import {
  Injectable,
  Inject,
  ConflictException,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateGoogleDriveFileDto } from './dto/create-google-drive-file.dto';
//import { UpdateGoogleDriveFileDto } from './dto/update-google-drive-file.dto';
import { ConfigService } from '@nestjs/config';
import { DriveFolderService } from 'src/drive-folder/drive-folder.service';
import { Readable } from 'stream';
//import { DriveFolderService } from 'src/drive-folder/drive-folder.service';
//import { GoogleDriveService } from 'nestjs-googledrive-upload';
//MUNICIPALITY_FOLDER_ID
@Injectable()
export class GoogleDriveFilesService {
  constructor(
    @Inject('GOOGLE_DRIVE_CLIENT') private readonly driveClient: any,
    private readonly configService: ConfigService,
    private readonly driveFolderService: DriveFolderService,
    // private readonly employeesService: EmployeesService,
  ) {}

  // Función para convertir un buffer en un stream
  private bufferToStream(buffer: Buffer): Readable {
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null); // Indica que el stream ha terminado
    return stream;
  }

  async createFile(
    createGoogleDriveFileDto: CreateGoogleDriveFileDto,
    file: Express.Multer.File,
  ) {
    try {
      // console.log(file);
      const userFolder = await this.driveFolderService.findOne(
        createGoogleDriveFileDto.EmployeeId,
      );

      if (!userFolder) {
        throw new ConflictException(
          'El usuario no tiene un forlder en Google Drive',
        );
      }

      // if (!userFolder) {
      //   const user = await this.employeesService.findOneById(
      //     createGoogleDriveFileDto.EmployeeId,
      //   );

      //   if (!user) {
      //     throw new Error('El usuario no existe');
      //   }

      //   await this.createMainFolder(user.id, `${user.Name} ${user.Surname1}`);
      // }

      const fileStream = this.bufferToStream(file.buffer);
      const response = await this.driveClient.files.create({
        requestBody: {
          name: `${createGoogleDriveFileDto.FileName}.${file.mimetype.split('/')[1]}`,
          mimeType: file.mimetype,
          parents: [userFolder.FolderId],
        },
        media: {
          mimeType: file.mimetype,
          body: fileStream,
        },
        fields: 'id, name',
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  async createMainFolder(EmployeeId: string, EmployeeWholeName: string) {
    const principalFolderId = await this.configService.get<string>(
      'MUNICIPALITY_FOLDER_ID',
    );
    try {
      const fileMetadata = {
        name: `${EmployeeId} - ${EmployeeWholeName}`,
        mimeType: 'application/vnd.google-apps.folder',
        description: 'Carpeta de documentos del empleado',
        parents: [principalFolderId],
      };

      const file = await this.driveClient.files.create({
        requestBody: fileMetadata,
        fields: 'id',
      });

      //await this.createSubFolders(file.data.id);

      return file.data.id;
    } catch (e) {
      throw new Error(`Failed to create folder:  Reason: ${e.message}`);
    }
  }

  async createSubFolders(parentFolderId: string) {
    try {
      // Llamada a la función síncrona que devuelve las carpetas básicas
      const foldersInformation = [
        {
          name: 'Solicitudes de vacaciones',
          mimeType: 'application/vnd.google-apps.folder',
          description: 'Carpeta de documentos de solicitudes de vacaciones',
          parents: [parentFolderId],
        },
        {
          name: 'Solicitudes de constancias salariales',
          mimeType: 'application/vnd.google-apps.folder',
          description: 'Carpeta de documentos de constancias salariales',
          parents: [parentFolderId],
        },
        {
          name: 'Boletas de pago',
          mimeType: 'application/vnd.google-apps.folder',
          description: 'Carpeta de documentos de boletas de pago',
          parents: [parentFolderId],
        },
        {
          name: 'Otros',
          mimeType: 'application/vnd.google-apps.folder',
          description: 'Carpeta de otros documentos',
          parents: [parentFolderId],
        },
      ];

      // Crear todas las carpetas en paralelo
      const files = await Promise.all(
        foldersInformation.map(async (folder) => {
          const response = await this.driveClient.files.create({
            requestBody: folder,
            fields: 'id, name',
          });
          console.log(
            `Carpeta creada: ${response.data.name} (ID: ${response.data.id})`,
          );
          return response.data.id; // Devuelve el ID de la carpeta creada
        }),
      );

      console.log('Todas las carpetas creadas con éxito:', files);
      return files; // Devuelve los IDs de las carpetas creadas
    } catch (e) {
      throw new Error(`Failed to create folder:  Reason: ${e.message}`);
    }
  }

  findAll() {
    return `This action returns all googleDriveFiles`;
  }
  async findMyAllFiles(id: string) {
    const userFolder = await this.driveFolderService.findOne(id);
    try {
      if (!userFolder) {
        throw new NotFoundException(
          'El usuario no tiene un forlder en Google Drive',
        );
      }
      const res = await this.driveClient.files.list({
        q: `'${(await userFolder).FolderId}' in parents`,
        pageSize: 10,
        fields:
          'nextPageToken, files(id, name, webViewLink, thumbnailLink, iconLink)',
        supportsAllDrives: true,
        orderby: 'odifiedTime desc',
      });
      console.log('Respuesta de la API:', res.data); // Imprimir la respuesta completa
      return res.data.files;
    } catch (e) {
      throw e;
    }
  }
  async findAllFilesByUser(id: string) {
    const userFolder = await this.driveFolderService.findOne(id);
    try {
      if (!userFolder) {
        throw new NotFoundException(
          'El usuario no tiene un forlder en Google Drive',
        );
      }
      const res = await this.driveClient.files.list({
        q: `'${(await userFolder).FolderId}' in parents`,
        pageSize: 10,
        fields:
          'nextPageToken, files(id, name, webViewLink, thumbnailLink, iconLink, webContentLink, mimeType)',
        supportsAllDrives: true,
        orderby: 'odifiedTime desc',
      });
      console.log('Respuesta de la API:', res.data); // Imprimir la respuesta completa
      return res.data.files;
    } catch (e) {
      throw e;
    }
  }

  async downloadFile(fileId: string, res: Response) {
    try {
      // Obtener los metadatos del archivo para verificar si existe y conocer la extensión y el tipo MIME
      const fileMetadata = await this.driveClient.files.get({
        fileId,
        fields: 'id, name, mimeType, fileExtension',
      });

      if (!fileMetadata.data) {
        throw new NotFoundException('Archivo no encontrado en Google Drive');
      }

      const mimeType = fileMetadata.data.mimeType;
      const fileName = fileMetadata.data.name;
      const fileExtension = fileMetadata.data.fileExtension
        ? `.${fileMetadata.data.fileExtension}`
        : '';

      // Verificar si el archivo es un archivo de Google Docs (que debe ser exportado)
      if (mimeType.startsWith('application/vnd.google-apps')) {
        // Determinar el tipo MIME de exportación basado en el tipo de archivo de Google
        let exportMimeType = 'application/pdf'; // Por defecto, exportar como PDF

        if (mimeType === 'application/vnd.google-apps.spreadsheet') {
          exportMimeType =
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'; // Exportar Google Sheets como Excel
        } else if (mimeType === 'application/vnd.google-apps.presentation') {
          exportMimeType =
            'application/vnd.openxmlformats-officedocument.presentationml.presentation'; // Exportar Google Slides como PowerPoint
        }

        const exportResponse = await this.driveClient.files.export(
          {
            fileId,
            mimeType: exportMimeType,
          },
          { responseType: 'stream' },
        );

        // Configurar encabezados para la descarga
        res.setHeader('Content-Type', exportMimeType);
        res.setHeader(
          'Content-Disposition',
          `inline; filename="${fileName}${fileExtension || (exportMimeType.includes('spreadsheet') ? '.xlsx' : exportMimeType.includes('presentation') ? '.pptx' : '.pdf')}"`,
        );

        exportResponse.data.pipe(res);
      } else {
        // Descargar el archivo binario directamente usando la extensión original
        const fileResponse = await this.driveClient.files.get(
          {
            fileId,
            alt: 'media',
          },
          { responseType: 'stream' },
        );

        // Configurar encabezados para la descarga directa
        res.setHeader('Content-Type', mimeType || 'application/octet-stream');
        res.setHeader(
          'Content-Disposition',
          `attachment; filename="${fileName}${fileExtension}"`,
        );

        console.log('Descargando archivo binario:', fileName);
        fileResponse.data.pipe(res);
      }
    } catch (e) {
      console.error('Error al descargar el archivo:', e);

      if (e.code === 403) {
        throw new ForbiddenException(
          'No tienes permisos para descargar este archivo.',
        );
      }

      throw new NotFoundException(
        'No se pudo descargar el archivo desde Google Drive',
      );
    }
  }

  async findOne(id: number) {
    return `This action returns a #${id} googleDriveFile`;
  }

  // update(id: number, updateGoogleDriveFileDto: UpdateGoogleDriveFileDto) {
  //   return `This action updates a #${id} googleDriveFile`;
  // }

  remove(id: number) {
    return `This action removes a #${id} googleDriveFile`;
  }

  async listFiles() {
    console.log('Listando archivos...');
    try {
      const res = await this.driveClient.files.list({
        q: "'1n5yRIbHad04XUx3qh2ZrSIaDkeaXhHBN' in parents ",
        pageSize: 10,
        fields: 'nextPageToken, files(id, name, webViewLink, thumbnailLink)',
        supportsAllDrives: true,
        orderby: 'odifiedTime desc',
      });
      console.log('Respuesta de la API:', res.data); // Imprimir la respuesta completa
      return res.data.files;
    } catch (error) {
      console.error('Error listing files:', error);
      throw new Error('Failed to list files');
    }
  }
}

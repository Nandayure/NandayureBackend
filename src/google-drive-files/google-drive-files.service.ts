import { Response } from 'express';
import {
  Injectable,
  Inject,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateGoogleDriveFileDto } from './dto/create-google-drive-file.dto';
//import { UpdateGoogleDriveFileDto } from './dto/update-google-drive-file.dto';
import { ConfigService } from '@nestjs/config';
import { DriveFolderService } from 'src/drive-folder/drive-folder.service';
import { Readable } from 'stream';
import { GetFilesFilterDto } from './dto/get-files-filter.dto';
import { MailClientService } from 'src/mail-client/mail-client.service';

@Injectable()
export class GoogleDriveFilesService {
  constructor(
    @Inject('GOOGLE_DRIVE_CLIENT') private readonly driveClient: any,
    private readonly configService: ConfigService,
    private readonly driveFolderService: DriveFolderService,
    private readonly mailClient: MailClientService,
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
      const fileStream = this.bufferToStream(file.buffer);

      const response = await this.driveClient.files.create({
        requestBody: {
          name: `${createGoogleDriveFileDto.FileName}.${file.mimetype.split('/')[1]}`,
          mimeType: file.mimetype,
          parents: [createGoogleDriveFileDto.FolderId],
        },
        media: {
          mimeType: file.mimetype,
          body: fileStream,
        },
        fields: 'id, name',
      });

      const ParentFolder = await this.driveClient.files.get({
        fileId: createGoogleDriveFileDto.FolderId,
        fields: 'name, parents',
        supportsAllDrives: true,
      });

      const principalParentFolderId = ParentFolder.data.parents[0];

      //Find employee upload folder to send mail
      const employeeUploadFolder =
        await this.driveFolderService.findOneWithRelationsByFolderId(
          principalParentFolderId,
        );

      if (employeeUploadFolder) {
        this.mailClient.sendNewFileUploadedMail({
          employeeEmail: employeeUploadFolder.Employee.Email,
          employeeName: `${employeeUploadFolder.Employee.Name} ${employeeUploadFolder.Employee.Surname1} ${employeeUploadFolder.Employee.Surname2}`,
          fileName: response.data.name,
          folderName: ParentFolder.data.name,
        });
      }

      const responseData = {
        id: response.data.id,
        name: response.data.name,
      };

      return responseData;
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

      await this.createSubFolders(file.data.id);

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
          name: 'Constancias salariales',
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
          name: 'Expedientes digitales',
          mimeType: 'application/vnd.google-apps.folder',
          description: 'Carpeta de otros documentos',
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

          return response.data.id; // Devuelve el ID de la carpeta creada
        }),
      );

      return files; // Devuelve los IDs de las carpetas creadas
    } catch (e) {
      throw new Error(`Failed to create folder:  Reason: ${e.message}`);
    }
  }

  // async findMyAllFiles(id: string, pageToken?: string, limit: number = 10) {
  //   const userFolder = await this.driveFolderService.findOne(id);

  //   if (!userFolder) {
  //     throw new NotFoundException(
  //       'El usuario no tiene un folder en Google Drive',
  //     );
  //   }

  //   try {
  //     const res = await this.driveClient.files.list({
  //       q: `'${userFolder.FolderId}' in parents`,
  //       pageSize: limit,
  //       pageToken: pageToken || undefined, // importante para paginación
  //       fields:
  //         'nextPageToken, files(id, name, webViewLink, thumbnailLink, iconLink, mimeType)',
  //       supportsAllDrives: true,
  //       orderBy: 'modifiedTime desc',
  //     });

  //     return {
  //       files: res.data.files,
  //       nextPageToken: res.data.nextPageToken || null,
  //       previusPageToken: res.data.previusPageToken || null,
  //       hasNextPage: res.data.nextPageToken ? true : false,
  //       hasPreviusPage: res.data.previusPageToken ? true : false,
  //       TotalPages: res.data.files.length || 0,
  //     };
  //   } catch (e) {
  //     throw e;
  //   }
  // }

  async getMyFolders(id: string) {
    try {
      const userFolder = await this.driveFolderService.findOne(id);
      if (!userFolder) {
        throw new NotFoundException(
          'El usuario no tiene un forder en Google Drive',
        );
      }
      const res = await this.driveClient.files.list({
        q: `'${userFolder.FolderId}' in parents and mimeType='application/vnd.google-apps.folder'`,

        pageSize: 10,
        // mimeType: 'application/vnd.google-apps.folder',
        fields:
          'nextPageToken, files(id, name, webViewLink, thumbnailLink, iconLink)',
        supportsAllDrives: true,
        orderBy: 'modifiedTime desc',
      });

      return res.data.files;
    } catch (e) {
      throw e;
    }
  }

  async getEmployeeFolders(employeeId: string) {
    try {
      const userFolder = await this.driveFolderService.findOne(employeeId);
      if (!userFolder) {
        throw new NotFoundException(
          'El usuario no tiene un forder en Google Drive',
        );
      }
      const res = await this.driveClient.files.list({
        q: `'${userFolder.FolderId}' in parents and mimeType='application/vnd.google-apps.folder'`,

        pageSize: 10,
        // mimeType: 'application/vnd.google-apps.folder',
        fields:
          'nextPageToken, files(id, name, webViewLink, thumbnailLink, iconLink)',
        supportsAllDrives: true,
        orderBy: 'modifiedTime desc',
      });

      return res.data.files;
    } catch (e) {
      throw e;
    }
  }

  async createNewFolder(id: string, folderName: string) {
    const userFolder = await this.driveFolderService.findOne(id);
    try {
      if (!userFolder) {
        throw new NotFoundException(
          'El usuario no tiene un forder en Google Drive',
        );
      }
      const fileMetadata = {
        name: folderName,
        mimeType: 'application/vnd.google-apps.folder',
        parents: [userFolder.FolderId],
      };

      const file = await this.driveClient.files.create({
        requestBody: fileMetadata,
        fields: 'id',
      });

      return file.data;
    } catch (e) {
      throw e;
    }
  }
  async findAllFilesByUser(id: string) {
    const userFolder = await this.driveFolderService.findOne(id);
    try {
      if (!userFolder) {
        throw new NotFoundException(
          'El usuario no tiene un forder en Google Drive',
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

      return res.data.files;
    } catch (e) {
      throw e;
    }
  }
  async findAllFilesByFolder(
    folderId: string,
    getFilesFilterDto: GetFilesFilterDto,
  ) {
    try {
      const {
        pageToken,
        limit = 10,
        orderDirection = 'desc',
        orderBy = 'modifiedTime',
        name,
      } = getFilesFilterDto;

      let q = `'${folderId}' in parents`;
      if (name) q += ` and name contains '${name}'`;

      const res = await this.driveClient.files.list({
        q,
        pageSize: limit,
        pageToken: pageToken || undefined,
        fields:
          'nextPageToken, files(id, name, webViewLink, thumbnailLink, iconLink, webContentLink, mimeType,parents)',
        supportsAllDrives: true,
        orderBy: `${orderBy} ${orderDirection}`,
      });

      return {
        data: res.data.files,
        limit,
        previusPageToken: res.data.previusPageToken || null,
        nextPageToken: res.data.nextPageToken || null,
        hasNextPage: res.data.nextPageToken ? true : false,
        hasPreviusPage: res.data.previusPageToken ? true : false,
      };
    } catch (e) {
      throw e;
    }
  }
  async findAllMyFilesByFolder(
    userId: string,
    folderId: string,
    getFilesFilterDto: GetFilesFilterDto,
  ) {
    const userFolder = await this.driveFolderService.findOne(userId);
    if (!userFolder) {
      throw new NotFoundException(
        'El usuario no tiene un forder en Google Drive',
      );
    }

    // Verificar si folderId pertenece a userFolder.id
    const folderMetadata = await this.driveClient.files.get({
      fileId: folderId,
      fields: 'parents',
      supportsAllDrives: true,
    });

    if (
      !folderMetadata.data.parents ||
      !folderMetadata.data.parents.includes(userFolder.FolderId)
    ) {
      throw new ForbiddenException(
        'El folder no pertenece al usuario o no está dentro de su folder principal',
      );
    }

    const {
      pageToken,
      limit = 10,
      orderDirection = 'desc',
      orderBy = 'modifiedTime',
      name,
    } = getFilesFilterDto;

    let q = `'${folderId}' in parents`;
    if (name) q += ` and name contains '${name}'`;

    const res = await this.driveClient.files.list({
      q,
      pageSize: limit,
      pageToken: pageToken || undefined,
      fields:
        'nextPageToken, files(id, name, webViewLink, thumbnailLink, iconLink, webContentLink, mimeType, parents)',
      supportsAllDrives: true,
      orderBy: `${orderBy} ${orderDirection}`,
    });

    return {
      data: res.data.files,
      limit,
      previusPageToken: res.data.previusPageToken || null,
      nextPageToken: res.data.nextPageToken || null,
      hasNextPage: res.data.nextPageToken ? true : false,
      hasPreviusPage: res.data.previusPageToken ? true : false,
    };
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
          `inline; filename="${fileName}${fileExtension}"`,
        );

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

  async remove(fileId: string) {
    const file = await this.driveClient.files.get({
      fileId,
      fields: 'owners, driveId, capabilities(canDelete, canTrash)',
      supportsAllDrives: true,
    });

    const canDelete = file.data.capabilities?.canDelete || false;
    const canTrash = file.data.capabilities?.canTrash || false;

    if (!canDelete && !canTrash) {
      throw new Error(
        'El archivo fue subido manualmente en Google Drive y no se puede eliminar desde la aplicación. Intente eliminarlo directamente desde Google Drive.',
      );
    }

    if (canDelete) {
      await this.driveClient.files.delete({
        fileId,
        supportsAllDrives: true,
      });
    } else if (canTrash) {
      await this.driveClient.files.update({
        fileId,
        requestBody: { trashed: true },
        supportsAllDrives: true,
      });
    }

    return { message: 'Archivo eliminado correctamente' };
  }
}

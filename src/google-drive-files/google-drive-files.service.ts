import { Injectable, Inject, ConflictException } from '@nestjs/common';
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
  async findAllByUser(id: string) {
    const userFolder = await this.driveFolderService.findOne(id);
    try {
      if (!userFolder) {
        throw new Error('El usuario no tiene un forlder en Google Drive');
      }
      const res = await this.driveClient.files.list({
        //q: `'${(await userFolder).FolderId}' in parents`,
        pageSize: 10,
        fields:
          'nextPageToken, files(id, name, webViewLink, thumbnailLink, iconLink)',
        supportsAllDrives: true,
        // orderby: 'odifiedTime desc',
      });
      console.log('Respuesta de la API:', res.data); // Imprimir la respuesta completa
      return res.data.files;
    } catch (e) {
      throw e;
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

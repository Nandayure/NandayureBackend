import { Injectable, Inject } from '@nestjs/common';
import { CreateGoogleDriveFileDto } from './dto/create-google-drive-file.dto';
import { UpdateGoogleDriveFileDto } from './dto/update-google-drive-file.dto';
import { ConfigService } from '@nestjs/config';
//import { GoogleDriveService } from 'nestjs-googledrive-upload';
//MUNICIPALITY_FOLDER_ID
@Injectable()
export class GoogleDriveFilesService {
  constructor(
    @Inject('GOOGLE_DRIVE_CLIENT') private readonly driveClient: any,
    private readonly configService: ConfigService,
  ) {}

  create(createGoogleDriveFileDto: CreateGoogleDriveFileDto) {
    return 'This action adds a new googleDriveFile';
  }
  async createFolder(createGoogleDriveFileDto: CreateGoogleDriveFileDto) {
    const principalFolderId = await this.configService.get<string>(
      'MUNICIPALITY_FOLDER_ID',
    );
    try {
      const fileMetadata = {
        name: createGoogleDriveFileDto.folderName,
        mimeType: 'application/vnd.google-apps.folder',
        parents: [principalFolderId],
      };

      const file = await this.driveClient.files.create({
        requestBody: fileMetadata,
        fields: 'id',
      });
      console.log('Folder Id:', file.data.id);
      return file.data.id;
    } catch (e) {
      throw new Error(`Failed to create folder:  Reason: ${e.message}`);
    }
  }

  findAll() {
    return `This action returns all googleDriveFiles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} googleDriveFile`;
  }

  update(id: number, updateGoogleDriveFileDto: UpdateGoogleDriveFileDto) {
    return `This action updates a #${id} googleDriveFile`;
  }

  remove(id: number) {
    return `This action removes a #${id} googleDriveFile`;
  }

  async listFiles() {
    console.log('Listando archivos...');
    try {
      const res = await this.driveClient.files.list({
        q: 'trashed = false',
        pageSize: 10,
        fields: 'nextPageToken, files(id, name, webViewLink, thumbnailLink)',
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

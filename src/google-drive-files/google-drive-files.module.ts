import { Module } from '@nestjs/common';
import { GoogleDriveFilesService } from './google-drive-files.service';
import { GoogleDriveFilesController } from './google-drive-files.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { google } from 'googleapis';
import { DriveFolderModule } from 'src/drive-folder/drive-folder.module';
import { MailClientModule } from 'src/mail-client/mail-client.module';
//import { EmployeesModule } from 'src/employees/employees.module';
//import { EmployeesModule } from 'src/employees/employees.module';
//import { EmployeesModule } from 'src/employees/employees.module';

@Module({
  imports: [ConfigModule, DriveFolderModule, MailClientModule],
  providers: [
    {
      provide: 'GOOGLE_DRIVE_CLIENT',
      useFactory: async (configService: ConfigService) => {
        const auth = new google.auth.JWT({
          email: configService.get<string>('GOOGLE_CLIENT_EMAIL'),
          key: configService.get<string>('GOOGLE_PRIVATE_KEY'),
          scopes: ['https://www.googleapis.com/auth/drive'],
        });

        return google.drive({
          version: 'v3',
          auth,
        });
      },
      inject: [ConfigService],
    },
    GoogleDriveFilesService,
  ],
  controllers: [GoogleDriveFilesController],
  exports: [GoogleDriveFilesService],
})
export class GoogleDriveFilesModule {}

import { Module } from '@nestjs/common';
import { DriveFolderService } from './drive-folder.service';
import { DriveFolderController } from './drive-folder.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriveFolder } from './entities/drive-folder.entity';
import { DriveFolderRepository } from './repository/drive-folder.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DriveFolder])],
  controllers: [DriveFolderController],
  providers: [DriveFolderService, DriveFolderRepository],
  exports: [DriveFolderService, DriveFolderRepository],
})
export class DriveFolderModule {}

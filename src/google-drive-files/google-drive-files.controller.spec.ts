import { Test, TestingModule } from '@nestjs/testing';
import { GoogleDriveFilesController } from './google-drive-files.controller';
import { GoogleDriveFilesService } from './google-drive-files.service';

describe('GoogleDriveFilesController', () => {
  let controller: GoogleDriveFilesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GoogleDriveFilesController],
      providers: [GoogleDriveFilesService],
    }).compile();

    controller = module.get<GoogleDriveFilesController>(
      GoogleDriveFilesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

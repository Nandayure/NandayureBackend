import { Test, TestingModule } from '@nestjs/testing';
import { GoogleDriveFilesService } from './google-drive-files.service';

describe('GoogleDriveFilesService', () => {
  let service: GoogleDriveFilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoogleDriveFilesService],
    }).compile();

    service = module.get<GoogleDriveFilesService>(GoogleDriveFilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

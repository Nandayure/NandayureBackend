import { Test, TestingModule } from '@nestjs/testing';
import { DriveFolderService } from './drive-folder.service';

describe('DriveFolderService', () => {
  let service: DriveFolderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DriveFolderService],
    }).compile();

    service = module.get<DriveFolderService>(DriveFolderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

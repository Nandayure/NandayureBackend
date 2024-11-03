import { Test, TestingModule } from '@nestjs/testing';
import { DriveFolderController } from './drive-folder.controller';
import { DriveFolderService } from './drive-folder.service';

describe('DriveFolderController', () => {
  let controller: DriveFolderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DriveFolderController],
      providers: [DriveFolderService],
    }).compile();

    controller = module.get<DriveFolderController>(DriveFolderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

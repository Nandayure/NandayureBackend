import { BaseInterfaceRepository } from 'src/core/generic-repository/interface/base.interface';
import { DriveFolder } from '../entities/drive-folder.entity';

export interface DriveFolderRepositoryInterface
  extends BaseInterfaceRepository<DriveFolder> {}

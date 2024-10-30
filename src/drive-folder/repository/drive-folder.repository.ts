import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DriveFolder } from '../entities/drive-folder.entity';
import { BaseAbstractRepostitory } from 'src/core/generic-repository/repository/base.repository';
import { DriveFolderRepositoryInterface } from './drive-folder.interface';

export class DriveFolderRepository
  extends BaseAbstractRepostitory<DriveFolder>
  implements DriveFolderRepositoryInterface
{
  constructor(
    @InjectRepository(DriveFolder)
    private readonly DriveFolderGenericRepository: Repository<DriveFolder>,
  ) {
    super(DriveFolderGenericRepository);
  }
}

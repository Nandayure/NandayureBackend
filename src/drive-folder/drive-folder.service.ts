import { Injectable } from '@nestjs/common';
import { CreateDriveFolderDto } from './dto/create-drive-folder.dto';
import { UpdateDriveFolderDto } from './dto/update-drive-folder.dto';
import { DriveFolderRepository } from './repository/drive-folder.repository';

@Injectable()
export class DriveFolderService {
  constructor(private readonly driveFolderRepository: DriveFolderRepository) {}

  async create(createDriveFolderDto: CreateDriveFolderDto) {
    try {
      const existFolder = await this.driveFolderRepository.findOneById(
        createDriveFolderDto.id,
      );

      if (existFolder) {
        return {
          message: 'La carpeta ya existe',
          folder: existFolder.FolderId,
        };
      }

      const newFolder = this.driveFolderRepository.create(createDriveFolderDto);

      const saved = await this.driveFolderRepository.save(newFolder);

      return saved;
    } catch (error) {
      throw error;
    }
  }

  async findOneWithRelationsByFolderId(id: string) {
    return this.driveFolderRepository.findOne({
      where: { FolderId: id },
      relations: {
        Employee: true,
      },
    });
  }

  async findAll() {
    return this.driveFolderRepository.findAll();
  }

  async findOne(id: string) {
    return this.driveFolderRepository.findOneById(id);
  }

  async update(id: number, updateDriveFolderDto: UpdateDriveFolderDto) {
    return `This action updates a #${id} driveFolder`;
  }

  async remove(id: number) {
    return `This action removes a #${id} driveFolder`;
  }
}

import { Test, TestingModule } from '@nestjs/testing';
import { GendersService } from '../genders.service';
import { GenderRepository } from '../repository/gender.repository';
import { CreateGenderDto } from '../dto/create-gender.dto';
import { NotFoundException } from '@nestjs/common';

describe('GendersService (Unit Test)', () => {
  let service: GendersService;
  let repository: GenderRepository;

  beforeEach(async () => {
    const mockRepository = {
      create: jest.fn(),
      save: jest.fn(),
      findOneById: jest.fn(),
      findByCondition: jest.fn(),
      findAll: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GendersService,
        { provide: GenderRepository, useValue: mockRepository },
      ],
    }).compile();

    service = module.get<GendersService>(GendersService);
    repository = module.get<GenderRepository>(GenderRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new gender', async () => {
    const createGenderDto: CreateGenderDto = { Name: 'Masculino' };
    const genderEntity = { id: 1, Name: 'Masculino', employees: [] };

    jest.spyOn(repository, 'findByCondition').mockResolvedValue(null);
    jest
      .spyOn(repository, 'create')
      .mockReturnValue({ id: 1, Name: 'Masculino', employees: [] });
    jest.spyOn(repository, 'save').mockResolvedValue(genderEntity);

    const result = await service.create(createGenderDto);

    expect(result).toEqual(genderEntity);
  });

  it('should find a gender by name', async () => {
    const genderEntity = { id: 1, Name: 'Masculino', employees: [] };

    jest.spyOn(repository, 'findByCondition').mockResolvedValue(genderEntity);

    const result = await service.findOneByName('Masculino');

    expect(result).toEqual(genderEntity);
  });

  it('should throw an error when trying to delete a non-existing gender', async () => {
    jest.spyOn(repository, 'findOneById').mockResolvedValue(null);

    await expect(service.remove(1)).rejects.toThrow(new NotFoundException());
  });
});

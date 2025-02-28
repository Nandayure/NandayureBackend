import { Test, TestingModule } from '@nestjs/testing';
import { GendersController } from '../genders.controller';
import { GendersService } from '../genders.service';
import { CreateGenderDto } from '../dto/create-gender.dto';
import { UpdateGenderDto } from '../dto/update-gender.dto';

describe('GendersController (Unit Test)', () => {
  let controller: GendersController;
  let service: GendersService;

  beforeEach(async () => {
    const mockService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOneById: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [GendersController],
      providers: [{ provide: GendersService, useValue: mockService }],
    }).compile();

    controller = module.get<GendersController>(GendersController);
    service = module.get<GendersService>(GendersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a gender', async () => {
    const createGenderDto: CreateGenderDto = { Name: 'Masculino' };
    const genderEntity = { id: 1, Name: 'Masculino', employees: [] };

    jest.spyOn(service, 'create').mockResolvedValue(genderEntity);

    const result = await controller.create(createGenderDto);
    expect(result).toEqual(genderEntity);
  });

  it('should return all genders', async () => {
    const genders = [{ id: 1, Name: 'Masculino', employees: [] }];
    jest.spyOn(service, 'findAll').mockResolvedValue(genders);

    const result = await controller.findAll();
    expect(result).toEqual(genders);
  });

  it('should update a gender', async () => {
    const updateGenderDto: UpdateGenderDto = { Name: 'Femenino' };
    const updatedGender = { id: 1, Name: 'Femenino', employees: [] };

    jest.spyOn(service, 'update').mockResolvedValue(updatedGender);

    const result = await controller.update('1', updateGenderDto);
    expect(result).toEqual(updatedGender);
  });

  it('should delete a gender', async () => {
    const genderDeleted = { id: 1, Name: 'Masculino', employees: [] };
    jest.spyOn(service, 'remove').mockResolvedValue(genderDeleted);

    const result = await controller.remove('1');
    expect(result).toEqual(genderDeleted);
  });
});

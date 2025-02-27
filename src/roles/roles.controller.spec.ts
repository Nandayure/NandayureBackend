import { Test, TestingModule } from '@nestjs/testing';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';

describe('RolesController', () => {
  let controller: RolesController;
  let rolesService: RolesService;

  beforeEach(async () => {
    const mockRolesService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOneByName: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolesController],
      providers: [{ provide: RolesService, useValue: mockRolesService }],
    }).compile();

    controller = module.get<RolesController>(RolesController);
    rolesService = module.get<RolesService>(RolesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call create method from service', async () => {
    const dto = { RoleName: 'Admin' };
    await controller.create(dto);
    expect(rolesService.create).toHaveBeenCalledWith(dto);
  });
});

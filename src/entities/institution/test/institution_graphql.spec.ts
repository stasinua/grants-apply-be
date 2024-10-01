import { Test, TestingModule } from '@nestjs/testing';
import { InstitutionService } from '../db/institution.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Institution } from '../db/institution.entity';

describe('InstitutionService', () => {
  let institutionService: InstitutionService;
  let institutionRepository: Repository<Institution>;

  const INSTITUTION_REPOSITORY_TOKEN = getRepositoryToken(Institution);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InstitutionService,
        {
          provide: INSTITUTION_REPOSITORY_TOKEN,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findBy: jest.fn(),
            findAndCount: jest
              .fn()
              .mockResolvedValue([{ name: 'test institution' }, 1]),
            createQueryBuilder: jest.fn(() => ({
              offset: jest.fn().mockReturnThis(),
              limit: jest.fn().mockReturnThis(),
              leftJoinAndSelect: jest.fn().mockReturnThis(),
              where: jest.fn().mockReturnThis(),
              orderBy: jest.fn().mockReturnThis(),
              getManyAndCount: jest
                .fn()
                .mockResolvedValue([{ name: 'test institution' }, 1]),
            })),
          },
        },
      ],
    }).compile();

    institutionService = module.get<InstitutionService>(InstitutionService);
    institutionRepository = module.get<Repository<Institution>>(
      INSTITUTION_REPOSITORY_TOKEN,
    );
  });

  it('repository should be defined', () => {
    expect(institutionRepository).toBeDefined();
  });

  it('should be defined', () => {
    expect(institutionService).toBeDefined();
  });
});

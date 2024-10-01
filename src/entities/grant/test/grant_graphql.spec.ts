import { Test, TestingModule } from '@nestjs/testing';
import { GrantService } from '../db/grant.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Grant } from '../db/grant.entity';
import { Repository } from 'typeorm';

describe('GrantService', () => {
  let grantService: GrantService;
  let grantRepository: Repository<Grant>;

  const GRANT_REPOSITORY_TOKEN = getRepositoryToken(Grant);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GrantService,
        {
          provide: GRANT_REPOSITORY_TOKEN,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findBy: jest.fn(),
            findAndCount: jest
              .fn()
              .mockResolvedValue([{ name: 'test grant' }, 1]),
            createQueryBuilder: jest.fn(() => ({
              offset: jest.fn().mockReturnThis(),
              limit: jest.fn().mockReturnThis(),
              leftJoinAndSelect: jest.fn().mockReturnThis(),
              where: jest.fn().mockReturnThis(),
              orderBy: jest.fn().mockReturnThis(),
              getManyAndCount: jest
                .fn()
                .mockResolvedValue([{ name: 'test grant' }, 1]),
            })),
          },
        },
      ],
    }).compile();

    grantService = module.get<GrantService>(GrantService);
    grantRepository = module.get<Repository<Grant>>(GRANT_REPOSITORY_TOKEN);
  });

  it('repository should be defined', () => {
    expect(grantRepository).toBeDefined();
  });

  it('should be defined', () => {
    expect(grantService).toBeDefined();
  });

  it('should call "query builder" if applicant id passed', async () => {
    await grantService.findAll(1, 2, 1);

    expect(grantRepository.createQueryBuilder).toHaveBeenCalled();
  });

  it('should call "findAndCount" correctly if applicant id not passed', async () => {
    const page = 1;
    const limit = 2;
    await grantService.findAll(page, limit);

    expect(grantRepository.findAndCount).toHaveBeenCalledWith({
      skip: (page - 1) * limit,
      take: limit,
      order: { deadlineAt: 'DESC' },
      relations: { institution: true },
    });
  });
});

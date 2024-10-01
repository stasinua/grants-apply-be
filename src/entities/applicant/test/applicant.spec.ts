import { Test, TestingModule } from '@nestjs/testing';
import { ApplicantService } from '../db/applicant.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Applicant } from '../db/applicant.entity';

describe('ApplicantService', () => {
  let applicantService: ApplicantService;
  let applicantRepository: Repository<Applicant>;

  const INSTITUTION_REPOSITORY_TOKEN = getRepositoryToken(Applicant);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApplicantService,
        {
          provide: INSTITUTION_REPOSITORY_TOKEN,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findBy: jest.fn(),
            findAndCount: jest
              .fn()
              .mockResolvedValue([{ name: 'test applicant' }, 1]),
            createQueryBuilder: jest.fn(() => ({
              offset: jest.fn().mockReturnThis(),
              limit: jest.fn().mockReturnThis(),
              leftJoinAndSelect: jest.fn().mockReturnThis(),
              where: jest.fn().mockReturnThis(),
              orderBy: jest.fn().mockReturnThis(),
              getManyAndCount: jest
                .fn()
                .mockResolvedValue([{ name: 'test applicant' }, 1]),
            })),
          },
        },
      ],
    }).compile();

    applicantService = module.get<ApplicantService>(ApplicantService);
    applicantRepository = module.get<Repository<Applicant>>(
      INSTITUTION_REPOSITORY_TOKEN,
    );
  });

  it('repository should be defined', () => {
    expect(applicantRepository).toBeDefined();
  });

  it('should be defined', () => {
    expect(applicantService).toBeDefined();
  });
});

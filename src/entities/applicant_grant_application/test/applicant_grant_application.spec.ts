import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApplicantGrantApplicationService } from '../db/applicant_grant_application.service';
import { ApplicantGrantApplication } from '../db/applicant_grant_application.entity';
import { GrantService } from '../../grant/db/grant.service';
import { ApplicantService } from '../../applicant/db/applicant.service';

describe('ApplicantGrantApplication', () => {
  let applicantGrantApplicationService: ApplicantGrantApplicationService;
  let grantService: GrantService;
  let applicantService: ApplicantService;
  let applicantGrantApplicationRepository: Repository<ApplicantGrantApplication>;

  const APPLLICANT_GRANT_APPLICATION_REPOSITORY_TOKEN = getRepositoryToken(
    ApplicantGrantApplication,
  );

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApplicantGrantApplicationService,
        {
          provide: GrantService,
          useValue: {
            findOneById: jest.fn().mockReturnThis(),
          },
        },
        {
          provide: ApplicantService,
          useValue: {
            findOneById: jest.fn().mockReturnThis(),
          },
        },
        {
          provide: APPLLICANT_GRANT_APPLICATION_REPOSITORY_TOKEN,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findAll: jest.fn(),
            findBy: jest.fn(),
            findOneBy: jest.fn(),
            findAndCount: jest
              .fn()
              .mockResolvedValue([
                { name: 'test applicant grant application' },
                1,
              ]),
            createQueryBuilder: jest.fn(() => ({
              offset: jest.fn().mockReturnThis(),
              limit: jest.fn().mockReturnThis(),
              leftJoinAndSelect: jest.fn().mockReturnThis(),
              where: jest.fn().mockReturnThis(),
              orderBy: jest.fn().mockReturnThis(),
              getManyAndCount: jest
                .fn()
                .mockResolvedValue([
                  { name: 'test applicant grant application' },
                  1,
                ]),
            })),
          },
        },
      ],
    }).compile();

    applicantGrantApplicationService =
      module.get<ApplicantGrantApplicationService>(
        ApplicantGrantApplicationService,
      );
    grantService = module.get<GrantService>(GrantService);
    applicantService = module.get<ApplicantService>(ApplicantService);
    applicantGrantApplicationRepository = module.get<
      Repository<ApplicantGrantApplication>
    >(APPLLICANT_GRANT_APPLICATION_REPOSITORY_TOKEN);
  });

  it('repository should be defined', () => {
    expect(applicantGrantApplicationRepository).toBeDefined();
  });

  it('should be defined', () => {
    expect(applicantGrantApplicationService).toBeDefined();
  });

  it('should call "findAndCount" correctly', async () => {
    const applicantId = 1;
    const page = 1;
    const limit = 2;
    await applicantGrantApplicationService.findAll(applicantId, page, limit);

    expect(
      applicantGrantApplicationRepository.findAndCount,
    ).toHaveBeenCalledWith({
      where: {
        applicant: { id: applicantId },
      },
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
      relations: { grant: { institution: true } },
    });
  });

  it('should call dependent services when creating application', async () => {
    const grantId = 1;
    const applicantId = 1;
    const positive = false;
    const reason = '';
    await applicantGrantApplicationService.create({
      grantId,
      applicantId,
      positive,
      reason,
    });

    expect(grantService.findOneById).toHaveBeenCalledWith(grantId);
    expect(applicantService.findOneById).toHaveBeenCalledWith(applicantId);
  });

  it('should search for existing application when creating application', async () => {
    const findExistingFeedbackSpy = jest.spyOn(
      applicantGrantApplicationService,
      'findExistingFeedback',
    );
    const grantId = 1;
    const applicantId = 1;
    const positive = false;
    const reason = '';
    await applicantGrantApplicationService.create({
      grantId,
      applicantId,
      positive,
      reason,
    });

    expect(findExistingFeedbackSpy).toHaveBeenCalledWith(grantId, applicantId);
  });

  it('should call "save" when creating application', async () => {
    const grantId = 1;
    const applicantId = 1;
    const positive = false;
    const reason = '';
    await applicantGrantApplicationService.create({
      grantId,
      applicantId,
      positive,
      reason,
    });

    expect(applicantGrantApplicationRepository.save).toHaveBeenCalled();
  });
});

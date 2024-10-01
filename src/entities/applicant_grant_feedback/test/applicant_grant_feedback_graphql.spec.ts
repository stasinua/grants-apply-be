import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApplicantGrantFeedbackService } from '../db/applicant_grant_feedback.service';
import { ApplicantGrantFeedback } from '../db/applicant_grant_feedback.entity';
import { GrantService } from '../../grant/db/grant.service';
import { ApplicantService } from '../../applicant/db/applicant.service';

describe('ApplicantGrantFeedback', () => {
  let applicantGrantFeedbackService: ApplicantGrantFeedbackService;
  let grantService: GrantService;
  let applicantService: ApplicantService;
  let applicantGrantFeedbackRepository: Repository<ApplicantGrantFeedback>;

  const APPLLICANT_GRANT_FEEDBACK_REPOSITORY_TOKEN = getRepositoryToken(
    ApplicantGrantFeedback,
  );

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApplicantGrantFeedbackService,
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
          provide: APPLLICANT_GRANT_FEEDBACK_REPOSITORY_TOKEN,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findAll: jest.fn(),
            findBy: jest.fn(),
            findOneBy: jest.fn(),
            findAndCount: jest
              .fn()
              .mockResolvedValue([
                { name: 'test applicant grant feedback' },
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
                  { name: 'test applicant grant feedback' },
                  1,
                ]),
            })),
          },
        },
      ],
    }).compile();

    applicantGrantFeedbackService = module.get<ApplicantGrantFeedbackService>(
      ApplicantGrantFeedbackService,
    );
    grantService = module.get<GrantService>(GrantService);
    applicantService = module.get<ApplicantService>(ApplicantService);
    applicantGrantFeedbackRepository = module.get<
      Repository<ApplicantGrantFeedback>
    >(APPLLICANT_GRANT_FEEDBACK_REPOSITORY_TOKEN);
  });

  it('repository should be defined', () => {
    expect(applicantGrantFeedbackRepository).toBeDefined();
  });

  it('should be defined', () => {
    expect(applicantGrantFeedbackService).toBeDefined();
  });

  it('should call "findAndCount" correctly with "positive" param', async () => {
    const applicantId = 1;
    const page = 1;
    const limit = 2;
    const positive = true;
    await applicantGrantFeedbackService.findAll(
      applicantId,
      page,
      limit,
      positive,
    );

    expect(applicantGrantFeedbackRepository.findAndCount).toHaveBeenCalledWith({
      where: {
        applicant: { id: applicantId },
        positive,
      },
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
      relations: { grant: { institution: true }, applicant: true },
    });
  });

  it('should call "findAndCount" correctly without "positive" param', async () => {
    const applicantId = 1;
    const page = 1;
    const limit = 2;
    await applicantGrantFeedbackService.findAll(applicantId, page, limit);

    expect(applicantGrantFeedbackRepository.findAndCount).toHaveBeenCalledWith({
      where: {
        applicant: { id: applicantId },
      },
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
      relations: { grant: { institution: true }, applicant: true },
    });
  });

  it('should call dependent services when creating feedback', async () => {
    const grantId = 1;
    const applicantId = 1;
    const positive = false;
    const feedback = '';
    await applicantGrantFeedbackService.create({
      grantId,
      applicantId,
      positive,
      feedback,
    });

    expect(grantService.findOneById).toHaveBeenCalledWith(grantId);
    expect(applicantService.findOneById).toHaveBeenCalledWith(applicantId);
  });

  it('should search for existing feedback when creating feedback', async () => {
    const findExistingFeedbackSpy = jest.spyOn(
      applicantGrantFeedbackService,
      'findExistingFeedback',
    );
    const grantId = 1;
    const applicantId = 1;
    const positive = false;
    const feedback = '';
    await applicantGrantFeedbackService.create({
      grantId,
      applicantId,
      positive,
      feedback,
    });

    expect(findExistingFeedbackSpy).toHaveBeenCalledWith(grantId, applicantId);
  });

  it('should call "save" when creating feedback', async () => {
    const grantId = 1;
    const applicantId = 1;
    const positive = false;
    const feedback = '';
    await applicantGrantFeedbackService.create({
      grantId,
      applicantId,
      positive,
      feedback,
    });

    expect(applicantGrantFeedbackRepository.save).toHaveBeenCalled();
  });
});

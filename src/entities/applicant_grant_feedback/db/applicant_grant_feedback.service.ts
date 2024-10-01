import { BadRequestException, Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { ApplicantGrantFeedback } from './applicant_grant_feedback.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicantService } from '../../applicant/db/applicant.service';
import { GrantService } from '../../grant/db/grant.service';

@Injectable()
export class ApplicantGrantFeedbackService {
  constructor(
    @InjectRepository(ApplicantGrantFeedback)
    private readonly applicantGrantFeedbackRepository: Repository<ApplicantGrantFeedback>,
    private readonly applicantService: ApplicantService,
    private readonly grantService: GrantService,
  ) {}

  async findAll(
    applicantId: number,
    page: number,
    limit: number,
    positive?: boolean,
  ): Promise<{ items: ApplicantGrantFeedback[]; total: number }> {
    const [items, total] =
      await this.applicantGrantFeedbackRepository.findAndCount({
        where: {
          applicant: { id: applicantId },
          ...(positive !== undefined ? { positive } : {}),
        },
        skip: (page - 1) * limit,
        take: limit,
        order: { createdAt: 'DESC' },
        relations: { grant: { institution: true }, applicant: true },
      });
    return {
      items,
      total,
    };
  }

  async findExistingFeedback(
    grantId: number,
    applicantId: number,
  ): Promise<ApplicantGrantFeedback> {
    return this.applicantGrantFeedbackRepository.findOneBy({
      grant: { id: grantId },
      applicant: { id: applicantId },
    });
  }

  async findOneById(id: number): Promise<ApplicantGrantFeedback> {
    return this.applicantGrantFeedbackRepository.findOneBy({ id: id });
  }

  async create(applicantGrantFeedbackObj: {
    grantId: number;
    applicantId: number;
    positive: boolean;
    feedback: string;
    // TODO: Change return to real type
  }): Promise<any> {
    const newApplicantGrantFeedback = new ApplicantGrantFeedback();

    const targetApplicant = await this.applicantService.findOneById(
      applicantGrantFeedbackObj.applicantId,
    );
    const targetGrant = await this.grantService.findOneById(
      applicantGrantFeedbackObj.grantId,
    );
    const alreadyExists = await this.findExistingFeedback(
      applicantGrantFeedbackObj.grantId,
      applicantGrantFeedbackObj.applicantId,
    );
    console.log('ApplicantGrantFeedback alreadyExists ->>>', alreadyExists);

    if (alreadyExists) {
      throw new BadRequestException('Cannot change the feedback');
    }
    if (!targetGrant) {
      throw new Error('No grant found with id provided');
    }
    if (!targetApplicant) {
      throw new Error('No applicant found with id provided');
    }

    const createAtDate = new Date();

    newApplicantGrantFeedback.applicant = targetApplicant;
    newApplicantGrantFeedback.grant = targetGrant;
    newApplicantGrantFeedback.feedback = applicantGrantFeedbackObj.feedback;
    newApplicantGrantFeedback.positive = applicantGrantFeedbackObj.positive;
    newApplicantGrantFeedback.createdAt = createAtDate;
    newApplicantGrantFeedback.updatedAt = createAtDate;
    console.log(
      'ApplicantGrantFeedback DB Create ->>>',
      applicantGrantFeedbackObj,
    );

    return await this.applicantGrantFeedbackRepository.save(
      newApplicantGrantFeedback,
    );
  }
}

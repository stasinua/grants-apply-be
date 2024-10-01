import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { ApplicantGrantApplication } from './applicant_grant_application.entity';
// import { Grant } from './account.entity';
import { InjectRepository } from '@nestjs/typeorm';
// import { Applicant } from 'src/entities/applicant/db/applicant.entity';
// import { Grant } from 'src/entities/grant/db/grant.entity';
import { ApplicantService } from '../../applicant/db/applicant.service';
import { GrantService } from '../../grant/db/grant.service';

@Injectable()
export class ApplicantGrantApplicationService {
  constructor(
    @InjectRepository(ApplicantGrantApplication)
    private readonly applicantGrantApplicationRepository: Repository<ApplicantGrantApplication>,
    // @InjectRepository(Account)
    private readonly applicantService: ApplicantService,
    private readonly grantService: GrantService,
  ) {}

  async findAll(
    applicantId: number,
    page: number,
    limit: number,
  ): Promise<{ items: ApplicantGrantApplication[]; total: number }> {
    // return this.applicantGrantApplicationRepository.find();
    const [items, total] =
      await this.applicantGrantApplicationRepository.findAndCount({
        where: {
          applicant: { id: applicantId },
        },
        skip: (page - 1) * limit,
        take: limit,
        order: { createdAt: 'DESC' },
        relations: { grant: { institution: true } },
      });
    return {
      items,
      total,
    };
  }

  async findExistingFeedback(
    grantId: number,
    applicantId: number,
  ): Promise<ApplicantGrantApplication> {
    return this.applicantGrantApplicationRepository.findOneBy({
      grant: { id: grantId },
      applicant: { id: applicantId },
    });
  }

  async findOneById(id: number): Promise<ApplicantGrantApplication> {
    return this.applicantGrantApplicationRepository.findOneBy({ id: id });
  }

  async create(applicantGrantApplicationObj: {
    grantId: number;
    applicantId: number;
    positive: boolean;
    reason: string;
    // TODO: Change return to real type
  }): Promise<any> {
    const newApplicantGrantApplication = new ApplicantGrantApplication();

    const targetApplicant = await this.applicantService.findOneById(
      applicantGrantApplicationObj.applicantId,
    );
    const targetGrant = await this.grantService.findOneById(
      applicantGrantApplicationObj.grantId,
    );
    const alreadyExists = await this.findExistingFeedback(
      applicantGrantApplicationObj.grantId,
      applicantGrantApplicationObj.applicantId,
    );
    console.log('ApplicantGrantApplication alreadyExists ->>>', alreadyExists);

    if (alreadyExists) {
      throw new Error('Cannot change the application');
    }
    if (!targetGrant) {
      throw new Error('No grant found with id provided');
    }
    if (!targetApplicant) {
      throw new Error('No applicant found with id provided');
    }
    newApplicantGrantApplication.applicant = targetApplicant;
    newApplicantGrantApplication.grant = targetGrant;
    newApplicantGrantApplication.reason = applicantGrantApplicationObj.reason;
    newApplicantGrantApplication.positive =
      applicantGrantApplicationObj.positive;
    console.log(
      'ApplicantGrantApplication DB Create ->>>',
      applicantGrantApplicationObj,
    );

    return await this.applicantGrantApplicationRepository.save(
      newApplicantGrantApplication,
    );
  }
}

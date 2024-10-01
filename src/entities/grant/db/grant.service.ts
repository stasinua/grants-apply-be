import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Grant } from './grant.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicantGrantFeedback } from '../../applicant_grant_feedback/db/applicant_grant_feedback.entity';

@Injectable()
export class GrantService {
  constructor(
    @InjectRepository(Grant)
    private readonly grantRepository: Repository<Grant>,
  ) {}

  async findAll(
    page: number,
    limit: number,
    applicantId?: number,
  ): Promise<{ items: Grant[]; total: number }> {
    if (!applicantId) {
      const [items, total] = await this.grantRepository.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
        order: { deadlineAt: 'DESC' },
        relations: { institution: true },
      });
      console.log('Grant findAll ->>', items.length);

      return {
        items,
        total,
      };
    } else {
      const [items, total] = await this.grantRepository
        .createQueryBuilder('grant')
        .leftJoinAndSelect('grant.institution', 'institution')
        .where((qb) => {
          const subQueryFeedback = qb // We should skip those that have negative feedbacks entered so we do not show them same grants again
            .subQuery()
            .select('DISTINCT "grantId"')
            .from(ApplicantGrantFeedback, 'grantFeedback')
            .where({ applicant: { id: applicantId } })
            .where({ positive: false })
            .getQuery();

          // console.log('subQueryFeedback ->>>', subQueryFeedback);

          return 'grant.id NOT IN ' + subQueryFeedback;
        })
        .offset((page - 1) * limit)
        .limit(limit)
        .orderBy('"deadlineAt"', 'DESC')
        .getManyAndCount();

      return {
        items,
        total,
      };
    }
  }

  async findAllApplicantGrants(applicantId: number): Promise<Grant[]> {
    return this.grantRepository.find({
      where: { grantApplications: { applicant: { id: applicantId } } },
    });
  }

  async findAllInstitutionGrants(institutionId: number): Promise<Grant[]> {
    return this.grantRepository.find({
      where: { institution: { id: institutionId } },
    });
  }

  async findOneById(id: number): Promise<Grant> {
    return this.grantRepository.findOne({
      where: { id: id },
      relations: { institution: true },
    });
  }

  async create(grantObj: {
    name: string;
    description: string;
    // TODO: Change return to real type
  }): Promise<any> {
    // const newGrant = new Grant();
    console.log('Grant DB Create ->>>', grantObj);

    // return await this.grantRepository.save(newGrant);
  }
}

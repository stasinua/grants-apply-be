import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { Applicant } from './applicant.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ApplicantService {
  constructor(
    @InjectRepository(Applicant)
    private readonly applicantRepository: Repository<Applicant>,
  ) {}

  async findAll(): Promise<Applicant[]> {
    return this.applicantRepository.find();
  }

  async findAllGrantApplicants(grantId: number): Promise<Applicant[]> {
    return this.applicantRepository.find({
      where: { grantApplications: { grant: { id: grantId } } },
    });
  }

  async findOneById(id: number): Promise<Applicant> {
    console.log('findOneById ->>>', id);

    return this.applicantRepository.findOneBy({ id: id });
  }

  async create(applicantObj: {
    name: string;
    description: string;
    // TODO: Change return to real type
  }): Promise<any> {
    // const newApplicant = new Applicant();
    console.log('Applicant DB Create ->>>', applicantObj);

    // return await this.applicantRepository.save(newApplicant);
  }
}

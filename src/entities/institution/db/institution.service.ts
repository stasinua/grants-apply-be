import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { Institution } from './institution.entity';
// import { Grant } from './account.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class InstitutionService {
  constructor(
    @InjectRepository(Institution)
    private readonly institutionRepository: Repository<Institution>,
    // @InjectRepository(Account)
    // private readonly accountRepository: Repository<Account>,
  ) {}

  async findAll(): Promise<Institution[]> {
    return this.institutionRepository.find();
  }

  async findOneById(id: number): Promise<Institution> {
    return this.institutionRepository.findOneBy({ id: id });
  }

  async create(institutionObj: {
    name: string;
    description: string;
    // TODO: Change return to real type
  }): Promise<any> {
    // const newInstitution = new Institution();
    console.log('Institution DB Create ->>>', institutionObj);

    // return await this.institutionRepository.save(newInstitution);
  }
}

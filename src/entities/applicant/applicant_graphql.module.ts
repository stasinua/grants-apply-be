import { Module } from '@nestjs/common';
import { ApplicantService } from './db/applicant.service';
import { ApplicantResolver } from './applicant.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Applicant } from './db/applicant.entity';
import { Grant } from '../grant/db/grant.entity';
import { GrantService } from '../grant/db/grant.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Grant]),
    TypeOrmModule.forFeature([Applicant]),
  ],
  providers: [ApplicantService, GrantService, ApplicantResolver],
})
export class ApplicantGraphqlModule {}

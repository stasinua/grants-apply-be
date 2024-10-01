import { Module } from '@nestjs/common';
import { ApplicantGrantApplicationService } from './db/applicant_grant_application.service';
import { ApplicantGrantApplicationResolver } from './applicant_grant_application.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicantGrantApplication } from './db/applicant_grant_application.entity';
import { ApplicantGraphqlModule } from '../applicant/applicant_graphql.module';
import { GrantGraphqlModule } from '../grant/grant_graphql.module';
import { ApplicantService } from '../applicant/db/applicant.service';
import { GrantService } from '../grant/db/grant.service';
import { Applicant } from '../applicant/db/applicant.entity';
import { Grant } from '../grant/db/grant.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ApplicantGrantApplication]),
    TypeOrmModule.forFeature([Applicant]),
    TypeOrmModule.forFeature([Grant]),
    ApplicantGraphqlModule,
    GrantGraphqlModule,
  ],
  providers: [
    ApplicantGrantApplicationService,
    ApplicantService,
    GrantService,
    ApplicantGrantApplicationResolver,
  ],
})
export class ApplicantGrantApplicationGraphqlModule {}

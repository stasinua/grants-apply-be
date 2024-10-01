import { Module } from '@nestjs/common';
import { ApplicantGrantFeedbackService } from './db/applicant_grant_feedback.service';
import { ApplicantGrantFeedbackResolver } from './applicant_grant_feedback.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicantGrantFeedback } from './db/applicant_grant_feedback.entity';
import { ApplicantGraphqlModule } from '../applicant/applicant_graphql.module';
import { GrantGraphqlModule } from '../grant/grant_graphql.module';
import { ApplicantService } from '../applicant/db/applicant.service';
import { GrantService } from '../grant/db/grant.service';
import { Applicant } from '../applicant/db/applicant.entity';
import { Grant } from '../grant/db/grant.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ApplicantGrantFeedback]),
    TypeOrmModule.forFeature([Applicant]),
    TypeOrmModule.forFeature([Grant]),
    ApplicantGraphqlModule,
    GrantGraphqlModule,
  ],
  providers: [
    ApplicantGrantFeedbackService,
    ApplicantService,
    GrantService,
    ApplicantGrantFeedbackResolver,
  ],
})
export class ApplicantGrantFeedbackGraphqlModule {}

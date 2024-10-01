import { Module } from '@nestjs/common';
import { GrantService } from './db/grant.service';
import { GrantResolver } from './grant.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grant } from './db/grant.entity';
import { ApplicantService } from '../applicant/db/applicant.service';
import { Applicant } from '../applicant/db/applicant.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Grant]),
    TypeOrmModule.forFeature([Applicant]),
  ],
  providers: [ApplicantService, GrantService, GrantResolver],
})
export class GrantGraphqlModule {}

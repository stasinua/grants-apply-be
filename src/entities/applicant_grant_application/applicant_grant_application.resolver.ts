import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ApplicantGrantApplicationService } from './db/applicant_grant_application.service';
// import { GrantService } from '../grant/db/grant.service';

@Resolver('ApplicantGrantApplication')
export class ApplicantGrantApplicationResolver {
  constructor(
    private applicantGrantApplicationResolverService: ApplicantGrantApplicationService,
    // private grantService: GrantService,
  ) {}

  @Query()
  async applicantGrantApplication(@Args('id') id: number) {
    return this.applicantGrantApplicationResolverService.findOneById(id);
  }

  @Query()
  async getAllApplicantGrantApplications(
    @Args('page') page: number,
    @Args('limit') limit: number,
    @Args('applicantId') applicantId: number,
  ) {
    return this.applicantGrantApplicationResolverService.findAll(
      applicantId,
      page,
      limit,
    );
  }

  @Mutation()
  async addApplication(
    @Args('grantId') grantId: number,
    @Args('applicantId') applicantId: number,
    @Args('positive') positive: boolean,
    @Args('reason') reason: string,
  ) {
    return this.applicantGrantApplicationResolverService.create({
      grantId,
      applicantId,
      reason,
      positive,
    });
  }
}

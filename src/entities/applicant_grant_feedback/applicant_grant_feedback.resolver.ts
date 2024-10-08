import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ApplicantGrantFeedbackService } from './db/applicant_grant_feedback.service';
// import { GrantService } from '../grant/db/grant.service';

@Resolver('ApplicantGrantFeedback')
export class ApplicantGrantFeedbackResolver {
  constructor(
    private applicantGrantFeedbackResolverService: ApplicantGrantFeedbackService,
    // private grantService: GrantService,
  ) {}

  @Query()
  async applicantGrantFeedback(@Args('id') id: number) {
    return this.applicantGrantFeedbackResolverService.findOneById(id);
  }

  @Query()
  async getAllApplicantGrantFeedbacks(
    @Args('applicantId') applicantId: number,
    @Args('page') page: number,
    @Args('limit') limit: number,
    @Args('positive') positive: boolean,
  ) {
    return this.applicantGrantFeedbackResolverService.findAll(
      applicantId,
      page,
      limit,
      positive,
    );
  }

  @Mutation()
  async addFeedback(
    @Args('grantId') grantId: number,
    @Args('applicantId') applicantId: number,
    @Args('positive') positive: boolean,
    @Args('feedback') feedback: string,
  ) {
    return this.applicantGrantFeedbackResolverService.create({
      grantId,
      applicantId,
      feedback,
      positive,
    });
  }

  @Mutation()
  async deleteAllFeedbacksForApplicant(
    @Args('applicantId') applicantId: number,
  ) {
    await this.applicantGrantFeedbackResolverService.deleteAllForApplicant(
      applicantId,
    );
    return [];
  }
}

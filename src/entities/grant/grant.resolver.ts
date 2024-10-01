import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ApplicantService } from '../applicant/db/applicant.service';
import { GrantService } from '../grant/db/grant.service';

@Resolver('Grant')
export class GrantResolver {
  constructor(
    private applicantService: ApplicantService,
    private grantService: GrantService,
  ) {}

  @Query()
  async grant(@Args('id') id: number) {
    return this.grantService.findOneById(id);
  }

  @Query()
  async getAllGrants(
    @Args('page') page: number,
    @Args('limit') limit: number,
    @Args('applicantId') applicantId: number,
  ) {
    return this.grantService.findAll(page, limit, applicantId);
  }

  @ResolveField()
  async applicants(@Parent() grant) {
    const { id } = grant;
    return this.applicantService.findAllGrantApplicants(id);
  }
}

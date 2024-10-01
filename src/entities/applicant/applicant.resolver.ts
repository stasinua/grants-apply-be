import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ApplicantService } from './db/applicant.service';

@Resolver('Applicant')
export class ApplicantResolver {
  constructor(private applicantService: ApplicantService) {}

  @Query()
  async applicant(@Args('id') id: number) {
    return this.applicantService.findOneById(id);
  }
}

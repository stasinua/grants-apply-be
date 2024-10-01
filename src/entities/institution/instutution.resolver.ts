import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { GrantService } from '../grant/db/grant.service';
import { InstitutionService } from './db/institution.service';

@Resolver('Institution')
export class InstitutionResolver {
  constructor(
    private institutionService: InstitutionService,
    private grantService: GrantService,
  ) {}

  @Query()
  async institution(@Args('id') id: number) {
    return this.institutionService.findOneById(id);
  }

  @Query()
  async getAllInstitutions() {
    return this.institutionService.findAll();
  }

  @ResolveField()
  async grants(@Parent() institution) {
    const { id } = institution;
    return this.grantService.findAllInstitutionGrants(id);
  }
}

import { Module } from '@nestjs/common';
import { InstitutionResolver } from './instutution.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Institution } from './db/institution.entity';
import { InstitutionService } from './db/institution.service';
import { GrantService } from '../grant/db/grant.service';
import { Grant } from '../grant/db/grant.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Institution]),
    TypeOrmModule.forFeature([Grant]),
  ],
  providers: [InstitutionService, GrantService, InstitutionResolver],
})
export class InstitutionGraphqlModule {}

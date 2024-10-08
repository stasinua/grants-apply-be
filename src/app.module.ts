import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grant } from './entities/grant/db/grant.entity';
import { Applicant } from './entities/applicant/db/applicant.entity';
import { Institution } from './entities/institution/db/institution.entity';
import { ApplicantGrantFeedback } from './entities/applicant_grant_feedback/db/applicant_grant_feedback.entity';
import { GrantGraphqlModule } from './entities/grant/grant_graphql.module';
import { ApplicantGraphqlModule } from './entities/applicant/applicant_graphql.module';
import { ApplicantGrantFeedbackGraphqlModule } from './entities/applicant_grant_feedback/applicant_grant_feedback_graphql.module';
import { InstitutionGraphqlModule } from './entities/institution/institution_graphql_module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
    }),
    ConfigModule.forRoot({
      envFilePath: '.env', // Path to your .env file
      isGlobal: true, // Make the configuration available globally
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        console.log(
          'PG HOST:',
          configService.get('POSTGRES_HOST'),
          'Node env ->>>',
          configService.get('NODE_ENV'),
          'Node port ->>>',
          configService.get('PORT'),
        );
        return {
          type: 'postgres',
          host: configService.get('POSTGRES_HOST'),
          port: parseInt(configService.get('POSTGRES_PORT')),
          username: configService.get('POSTGRES_USERNAME'),
          password: configService.get('POSTGRES_PASSWORD'),
          database:
            configService.get('NODE_ENV') === 'test'
              ? configService.get('POSTGRES_DATABASE_TEST')
              : configService.get('POSTGRES_DATABASE'),
          entities: [Applicant, Grant, Institution, ApplicantGrantFeedback],
          // synchronize: configService.get('NODE_ENV') === 'test' ? true : false, // Be cautious about using synchronize in production
          schemaSync: {
            synchronize: true,
            options: {
              outputSchemaSyncFile: 'custom_schema.sql',
            },
          },
        };
      },
      inject: [ConfigService],
    }),
    GrantGraphqlModule,
    ApplicantGraphqlModule,
    ApplicantGrantFeedbackGraphqlModule,
    InstitutionGraphqlModule,
  ],
})
export class AppModule {}

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import request from 'supertest-graphql';
import gql from 'graphql-tag';
import { Grant } from '../src/entities/grant/db/grant.entity';
import { Server } from 'http';
import { DataSource } from 'typeorm';
import { ApplicantGrantFeedback } from '../src/entities/applicant_grant_feedback/db/applicant_grant_feedback.entity';
import { ApplicantGrantApplication } from 'src/entities/applicant_grant_application/db/applicant_grant_application.entity';
import { readFileSync } from 'fs';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let httpServer: Server;
  let dataSource: DataSource;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    httpServer = app.getHttpServer();
    dataSource = app.get(DataSource);

    // Pre-populate db with data
    const queryRunnerTestDb = dataSource.createQueryRunner();

    const sql = await readFileSync(
      process.cwd() + '/scripts/import_db_data/import_data.sql',
      'utf-8',
    );

    const dbLog = await queryRunnerTestDb.query(sql);

    console.log('BEFORE ALL SQL SCRIPT...', sql.slice(0, 100), dbLog);

    await queryRunnerTestDb.release();
  });

  it('Grants "find all" request works', async () => {
    const response = await request<{
      getAllGrants: { items: Grant[]; total: number };
    }>(httpServer)
      .query(gql`
        query getAllGrants($applicantId: Int, $page: Int!, $limit: Int!) {
          getAllGrants(applicantId: $applicantId, page: $page, limit: $limit) {
            items {
              name
            }
            total
          }
        }
      `)
      .variables({
        page: 1,
        limit: 10,
      })
      .expectNoErrors();

    expect(response.data.getAllGrants).toMatchObject({
      total: 8,
    });
  });

  it('Grant Feedbacks "find all" request works', async () => {
    const response = await request<{
      getAllApplicantGrantFeedbacks: {
        items: ApplicantGrantFeedback[];
        total: number;
      };
    }>(httpServer)
      .query(gql`
        query getAllApplicantGrantFeedbacks(
          $applicantId: Int!
          $page: Int!
          $limit: Int!
          $positive: Boolean
        ) {
          getAllApplicantGrantFeedbacks(
            applicantId: $applicantId
            page: $page
            limit: $limit
            positive: $positive
          ) {
            items {
              id
              grant {
                name
                institution {
                  name
                }
                description
                grantAmount
                location
                startingAt
                deadlineAt
                fundingAreas
              }
              applicant {
                name
              }
              positive
              feedback
              createdAt
            }
            total
          }
        }
      `)
      .variables({
        applicantId: 1,
        page: 1,
        limit: 10,
      })
      .expectNoErrors();

    expect(response.data.getAllApplicantGrantFeedbacks).toMatchObject({
      total: 0,
    });
  });

  it('Grant Applications "find all" request works', async () => {
    const response = await request<{
      getAllApplicantGrantApplications: {
        items: ApplicantGrantApplication[];
        total: number;
      };
    }>(httpServer)
      .query(gql`
        query getAllApplicantGrantApplications(
          $page: Int!
          $limit: Int!
          $applicantId: Int!
        ) {
          getAllApplicantGrantApplications(
            page: $page
            limit: $limit
            applicantId: $applicantId
          ) {
            items {
              id
              grant {
                name
                institution {
                  name
                }
                description
                grantAmount
                location
                startingAt
                deadlineAt
                fundingAreas
                createdAt
              }
              positive
              createdAt
            }
            total
          }
        }
      `)
      .variables({
        applicantId: 1,
        page: 1,
        limit: 10,
      })
      .expectNoErrors();

    expect(response.data.getAllApplicantGrantApplications).toMatchObject({
      total: 4,
    });
  });

  it('Grant Feedbacks "create" request works', async () => {
    const response = await request<{
      addFeedback: ApplicantGrantFeedback;
    }>(httpServer)
      .query(gql`
        mutation addFeedback(
          $grantId: Int!
          $applicantId: Int!
          $positive: Boolean!
          $feedback: String
        ) {
          addFeedback(
            grantId: $grantId
            applicantId: $applicantId
            positive: $positive
            feedback: $feedback
          ) {
            grant {
              name
            }
            applicant {
              name
            }
            feedback
          }
        }
      `)
      .variables({
        grantId: 3,
        applicantId: 1,
        positive: true,
        feedback: 'Some feedback',
      })
      .expectNoErrors();

    expect(response.data.addFeedback).toMatchObject({
      grant: {
        name: 'Dribble Foundation Grant',
      },
      applicant: {
        name: 'test1',
      },
      feedback: 'Some feedback',
    });
  });

  it('Grant Feedbacks "create" request works', async () => {
    const response = await request<{
      addFeedback: ApplicantGrantFeedback;
    }>(httpServer)
      .query(gql`
        mutation addFeedback(
          $grantId: Int!
          $applicantId: Int!
          $positive: Boolean!
          $feedback: String
        ) {
          addFeedback(
            grantId: $grantId
            applicantId: $applicantId
            positive: $positive
            feedback: $feedback
          ) {
            grant {
              name
            }
            applicant {
              name
            }
            feedback
          }
        }
      `)
      .variables({
        grantId: 3,
        applicantId: 1,
        positive: true,
        feedback: 'Some feedback',
      });

    expect(response.data.addFeedback).toBeNull();
    expect(response.errors).toHaveLength(1);
  });

  it('Grant Feedbacks "find all" request works after feedback create', async () => {
    const response = await request<{
      getAllApplicantGrantFeedbacks: {
        items: ApplicantGrantFeedback[];
        total: number;
      };
    }>(httpServer)
      .query(gql`
        query getAllApplicantGrantFeedbacks(
          $applicantId: Int!
          $page: Int!
          $limit: Int!
          $positive: Boolean
        ) {
          getAllApplicantGrantFeedbacks(
            applicantId: $applicantId
            page: $page
            limit: $limit
            positive: $positive
          ) {
            items {
              id
              grant {
                name
                institution {
                  name
                }
                description
                grantAmount
                location
                startingAt
                deadlineAt
                fundingAreas
              }
              applicant {
                name
              }
              positive
              feedback
              createdAt
            }
            total
          }
        }
      `)
      .variables({
        applicantId: 1,
        page: 1,
        limit: 10,
      })
      .expectNoErrors();

    expect(response.data.getAllApplicantGrantFeedbacks).toMatchObject({
      total: 1,
    });
  });

  afterAll(async () => {
    await dataSource.destroy();
    app.close();
  });
});

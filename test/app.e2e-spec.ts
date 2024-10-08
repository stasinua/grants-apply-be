import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import request from 'supertest-graphql';
import gql from 'graphql-tag';
import { Grant } from '../src/entities/grant/db/grant.entity';
import { Server } from 'http';
import { DataSource } from 'typeorm';
import { ApplicantGrantFeedback } from '../src/entities/applicant_grant_feedback/db/applicant_grant_feedback.entity';
import { readFileSync } from 'fs';
import * as path from 'path';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let httpServer: Server;
  let dataSource: DataSource;

  beforeAll(async () => {
    console.log(
      'ACCESSING DIR ->>>',
      path.join(process.cwd(), 'scripts/import_db_data/import_data.sql'),
    );
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    httpServer = app.getHttpServer();
    dataSource = app.get(DataSource);

    // Pre-populate db with data
    const queryRunnerTestDb = dataSource.createQueryRunner();
    console.log(
      'ACCESSING DIR ->>>',
      path.join(process.cwd(), 'scripts/import_db_data/import_data.sql'),
    );

    const sql = await readFileSync(
      path.join(process.cwd(), 'scripts/import_db_data/import_data.sql'),
      'utf-8',
    );

    console.log('SQL FILE ->>>', sql.length);

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

  it('Grant Feedbacks "delete all" request works', async () => {
    const response = await request<{
      deleteAllFeedbacksForApplicant: [ApplicantGrantFeedback];
    }>(httpServer)
      .query(gql`
        mutation deleteAllFeedbacksForApplicant($applicantId: Int!) {
          deleteAllFeedbacksForApplicant(applicantId: $applicantId) {
            id
          }
        }
      `)
      .variables({
        applicantId: 1,
      })
      .expectNoErrors();

    expect(response.data.deleteAllFeedbacksForApplicant).toHaveLength(0);
  });

  it('Grant Feedbacks "find all" request response with 0 docs after "delete all" operation', async () => {
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

  afterAll(async () => {
    await dataSource.destroy();
    app.close();
  });
});

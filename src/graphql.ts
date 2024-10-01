
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface Applicant {
    id: number;
    name?: Nullable<string>;
    grants?: Nullable<Nullable<Grant>[]>;
}

export interface IQuery {
    applicant(id: number): Nullable<Applicant> | Promise<Nullable<Applicant>>;
    applicantGrantApplication(id: number): Nullable<ApplicantGrantApplication> | Promise<Nullable<ApplicantGrantApplication>>;
    getAllApplicantGrantApplications(page?: Nullable<number>, limit?: Nullable<number>, applicantId?: Nullable<number>): Nullable<ApplicantGrantApplicationList> | Promise<Nullable<ApplicantGrantApplicationList>>;
    applicantGrantFeedback(id: number): Nullable<ApplicantGrantFeedback> | Promise<Nullable<ApplicantGrantFeedback>>;
    getAllApplicantGrantFeedbacks(applicantId: number, page: number, limit: number, positive?: Nullable<boolean>): Nullable<ApplicantGrantFeedbackList> | Promise<Nullable<ApplicantGrantFeedbackList>>;
    grant(id: number): Nullable<Grant> | Promise<Nullable<Grant>>;
    getAllGrants(page: number, limit: number, applicantId?: Nullable<number>): Nullable<GrantList> | Promise<Nullable<GrantList>>;
    institution(id: number): Nullable<Institution> | Promise<Nullable<Institution>>;
    getAllInstitutions(): Nullable<Nullable<Institution>[]> | Promise<Nullable<Nullable<Institution>[]>>;
}

export interface ApplicantGrantApplication {
    id: number;
    grant?: Nullable<Grant>;
    applicant?: Nullable<Applicant>;
    positive?: Nullable<boolean>;
    reason?: Nullable<string>;
    createdAt?: Nullable<string>;
    updatedAt?: Nullable<string>;
}

export interface ApplicantGrantApplicationList {
    items: ApplicantGrantApplication[];
    total: number;
}

export interface IMutation {
    addApplication(grantId: number, applicantId: number, positive: boolean, reason?: Nullable<string>): Nullable<ApplicantGrantApplication> | Promise<Nullable<ApplicantGrantApplication>>;
    addFeedback(grantId: number, applicantId: number, positive: boolean, feedback?: Nullable<string>): Nullable<ApplicantGrantFeedback> | Promise<Nullable<ApplicantGrantFeedback>>;
    addApplicant(applicantId: number): Nullable<Grant> | Promise<Nullable<Grant>>;
}

export interface ApplicantGrantFeedback {
    id: number;
    grant?: Nullable<Grant>;
    applicant?: Nullable<Applicant>;
    positive?: Nullable<boolean>;
    feedback?: Nullable<string>;
    createdAt?: Nullable<string>;
    updatedAt?: Nullable<string>;
}

export interface ApplicantGrantFeedbackList {
    items: ApplicantGrantFeedback[];
    total: number;
}

export interface Grant {
    id: number;
    name?: Nullable<string>;
    applicants?: Nullable<Nullable<Applicant>[]>;
    institution?: Nullable<Institution>;
    description?: Nullable<string>;
    grantAmount?: Nullable<number>;
    startingAt?: Nullable<string>;
    deadlineAt?: Nullable<string>;
    location?: Nullable<string>;
    fundingAreas?: Nullable<Nullable<string>[]>;
    createdAt?: Nullable<string>;
    updatedAt?: Nullable<string>;
}

export interface GrantList {
    items: Grant[];
    total: number;
}

export interface Institution {
    id: number;
    name?: Nullable<string>;
    description?: Nullable<string>;
    grants?: Nullable<Nullable<Applicant>[]>;
}

type Nullable<T> = T | null;

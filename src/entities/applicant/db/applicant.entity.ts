import { ApplicantGrantApplication } from '../../applicant_grant_application/db/applicant_grant_application.entity';
import { ApplicantGrantFeedback } from '../../applicant_grant_feedback/db/applicant_grant_feedback.entity';
// import { Grant } from 'src/entities/grant/db/grant.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  // ManyToMany,
  OneToMany,
} from 'typeorm';

@Entity()
export class Applicant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 128 })
  name: string;

  @Column('text')
  description: string;

  @OneToMany(
    () => ApplicantGrantApplication,
    (grantApplication) => grantApplication.applicant,
  )
  grantApplications: ApplicantGrantApplication;

  @OneToMany(
    () => ApplicantGrantFeedback,
    (grantFeedback) => grantFeedback.applicant,
  )
  grantFeedbacks: ApplicantGrantApplication;
}

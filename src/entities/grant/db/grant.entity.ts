import { ApplicantGrantFeedback } from '../../applicant_grant_feedback/db/applicant_grant_feedback.entity';
import { Institution } from '../../institution/db/institution.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Grant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 128 })
  name: string;

  @Column('text')
  description: string;

  @Column('int')
  grantAmount: number;

  @Column('timestamp with time zone')
  startingAt: Date;

  @Column('timestamp with time zone')
  deadlineAt: Date;

  @Column('text')
  location: string;

  @Column('text', { array: true, nullable: true })
  fundingAreas: string[];

  @Column('timestamp with time zone')
  createdAt: Date;

  @Column('timestamp with time zone')
  updatedAt: Date;

  @OneToMany(
    () => ApplicantGrantFeedback,
    (grantFeedback) => grantFeedback.grant,
  )
  grantFeedbacks: ApplicantGrantFeedback;

  @ManyToOne(() => Institution, (institution) => institution.grants)
  institution: Institution;
}

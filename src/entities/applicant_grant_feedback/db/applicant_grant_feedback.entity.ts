import { Applicant } from '../../applicant/db/applicant.entity';
import { Grant } from '../../grant/db/grant.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ApplicantGrantFeedback {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Grant, (grant) => grant.grantFeedbacks)
  grant: Grant;

  @ManyToOne(() => Applicant, (applicant) => applicant.grantFeedbacks)
  applicant: Applicant;

  @Column('boolean')
  positive: boolean;

  @Column('text')
  feedback: string;

  @Column('timestamp with time zone')
  createdAt: Date;

  @Column('timestamp with time zone')
  updatedAt: Date;
}

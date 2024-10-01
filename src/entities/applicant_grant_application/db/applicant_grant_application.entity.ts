import { Applicant } from '../../applicant/db/applicant.entity';
import { Grant } from '../../grant/db/grant.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ApplicantGrantApplication {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Grant, (grant) => grant.grantApplications)
  grant: Grant;

  @ManyToOne(() => Applicant, (applicant) => applicant.grantApplications)
  applicant: Applicant;

  @Column('boolean', { nullable: true })
  positive: boolean;

  @Column('text')
  reason: string;

  @Column('timestamp with time zone')
  createdAt: Date;

  @Column('timestamp with time zone')
  updatedAt: Date;
}

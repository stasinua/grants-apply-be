import { Grant } from '../../grant/db/grant.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Institution {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 128 })
  name: string;

  @Column('text')
  description: string;

  @OneToMany(() => Grant, (grant) => grant.institution)
  grants: Grant;
}

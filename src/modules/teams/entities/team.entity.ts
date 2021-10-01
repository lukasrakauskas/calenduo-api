import { AbstractEntity } from 'src/common/entities/abstract.entity';
import { Job } from 'src/modules/jobs/entities/job.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
} from 'typeorm';

@Entity()
export class Team extends AbstractEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @OneToOne(() => User)
  @JoinColumn()
  owner: User;

  @ManyToMany(() => User)
  @JoinTable()
  members: Promise<User[]>;

  @OneToMany(() => Job, (job) => job.team)
  jobs: Promise<Job[]>;
}
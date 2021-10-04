import { AbstractEntity } from 'src/common/entities/abstract.entity';
import { Job } from 'src/modules/jobs/entities/job.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Review extends AbstractEntity {
  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'int' })
  rating: number;

  @Column({ type: 'int', nullable: true })
  jobId: number;

  @ManyToOne(() => Job, (job) => job.reviews)
  @JoinColumn({ name: 'jobId' })
  job: Promise<Job>;
}

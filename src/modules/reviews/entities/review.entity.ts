import { AbstractEntity } from 'src/common/entities/abstract.entity';
import { Job } from 'src/modules/jobs/entities/job.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Review extends AbstractEntity {
  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  rating: number;

  @ManyToOne(() => Job, (job) => job.reviews)
  job: Promise<Job>;
}

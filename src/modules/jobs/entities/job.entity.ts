import { AbstractEntity } from 'src/common/entities/abstract.entity';
import { Review } from 'src/modules/reviews/entities/review.entity';
import { Team } from 'src/modules/teams/entities/team.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Job extends AbstractEntity {
  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'double precision' })
  hourlyRate: number;

  @Column({ type: 'int', nullable: true })
  teamId: number;

  @ManyToOne(() => Team, (team) => team.jobs, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'teamId' })
  team: Promise<Team>;

  @OneToMany(() => Review, (review) => review.job)
  reviews: Promise<Review[]>;
}

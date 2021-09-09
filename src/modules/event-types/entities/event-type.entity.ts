import { AbstractEntity } from 'src/common/entities/abstract.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class EventType extends AbstractEntity {
  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ default: false })
  isHidden: boolean;

  @ManyToOne(() => User, (user) => user.eventTypes)
  user: User;
}

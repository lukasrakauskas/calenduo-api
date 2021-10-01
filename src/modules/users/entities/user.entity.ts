import { Exclude } from 'class-transformer';
import { AbstractEntity } from 'src/common/entities/abstract.entity';
import { EventType } from 'src/modules/event-types/entities/event-type.entity';
import { Role } from 'src/modules/roles/enums/role.enum';
import { Team } from 'src/modules/teams/entities/team.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class User extends AbstractEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    array: true,
    default: [Role.User],
  })
  roles: Role[];

  @OneToMany(() => EventType, (eventType) => eventType.user)
  eventTypes: EventType[];

  @OneToMany(() => Team, (team) => team.owner)
  teams: Promise<Team[]>;
}
